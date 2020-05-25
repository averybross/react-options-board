const WebSocket = require('ws');
const cors = require('cors')
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())

app.get('/api/contracts', async function (req, res) {
    const contracts = fetch(`https://trade.ledgerx.com/api/contracts?after_ts=${req.query.after_ts}&limit=0&offset=0`)
        .then(res => res.json());

    res.send(contractsCall);
});

app.get('/api/booktops', async function (req, res) {
    const booktops = fetch(`https://trade.ledgerx.com/api/book-tops`)
        .then(res => res.json());

    res.send(contractsCall);
});

app.get('/api', async function (req, res) {
    const contractsCall = fetch(`https://trade.ledgerx.com/api/contracts?after_ts=${req.query.after_ts}&limit=0&offset=0`)
        .then(res => res.json());

    const booktopsCall = fetch('https://trade.ledgerx.com/api/book-tops')
        .then(res => res.json());

    let [{ data: contracts }, { data: booktops}] = await Promise.all([contractsCall, booktopsCall])

    const response = contracts
        .sort((a, b) => {
            if(a.derivative_type > b.derivative_type) {
                return -1;
            }
            if(a.derivative_type < b.derivative_type) {
                return 1;
            }

            if (a.date_expires < b.date_expires) {
                return -1
            }
            if (a.date_expires > b.date_expires) {
                return 1
            }

            if (a.strike_price < b.strike_price) {
                return -1
            }
            if (a.strike_price > b.strike_price) {
                return 1
            }

            if (a.type === 'call') {
                return -1
            }

            if (a.type === 'put') {
                return 1
            }

        })
        .reduce(({optionsContracts, optionsDictionary, nextDayContracts, activeNextDayContract}, contract, index) => {
            // connect initial booktop with contract
            const lookupId = contract.id;
            const firstBooktop = booktops.filter(booktop => booktop.contract_id === lookupId);

            firstBooktop[0].datetime = Date.now();

            contract.booktops = [firstBooktop[0]]

            if(contract.derivative_type === 'options_contract') {

                if(optionsContracts[contract.date_expires] === undefined) {
                    optionsContracts[contract.date_expires] = [];
                }
                
                // pair optionsContracts by put/call
                if(index % 2) {
                    optionsContracts[contract.date_expires][optionsContracts[contract.date_expires].length-1].push(contract)
                } else {
                    optionsContracts[contract.date_expires].push([contract]);
                }

                if(!optionsDictionary[lookupId]) {
                    optionsDictionary[lookupId] = [contract.date_expires, optionsContracts[contract.date_expires].length-1, index % 2];
                }

            } else {
                nextDayContracts[contract.id] = contract;
                if(contract.active) {
                    activeNextDayContract = contract;
                }
            }

            return {
                optionsContracts,
                optionsDictionary,
                nextDayContracts,
                activeNextDayContract,
            };
        }, {
            optionsContracts: {},
            optionsDictionary: {},
            nextDayContracts: {},
            activeNextDayContract: undefined,
        });


        
    res.send(response);
})

app.use(express.static(__dirname + '/'));

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html')); // relative path
    });
}

const appServer = app.use(express.static( 'build' )).listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

const
    io = require("socket.io")(appServer);

let sequenceNumberByClient = new Map();

const ws = new WebSocket('wss://trade.ledgerx.com/api/ws');

// event fired every time a new client connects:
io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    ws.on('message', (msg) => {
        socket.emit('message', msg);
    })

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client disconnected [id=${socket.id}]`);
    });

});