const WebSocket = require('ws');
const mongoose = require('mongoose');
const { contractSchema, booktopSchema} = require('./schemas');
        
var Contract = mongoose.model('Contract', contractSchema);
var Booktop = mongoose.model('Booktop', booktopSchema);

class WebsocketAPI {

    constructor(server) {

        this.io = require("socket.io")(server);

        this.ws;
        
        this.start('wss://trade.ledgerx.com/api/ws');
        this.listen();
    }

    start(websocketServerLocation){
        this.ws = new WebSocket(websocketServerLocation);
        this.ws.onmessage = function(evt) { };
        this.ws.onclose = function(){
            // Try to reconnect in 5 seconds
            setTimeout(function(){start(websocketServerLocation)}, 5000);
        };
    }

    listen() {
        
        let sequenceNumberByClient = new Map();
        
        this.ws.on('message', (msg) => {
            
            const booktopData = JSON.parse(msg);
        
            booktopData.datetime = Date.now();
        
            Contract.findOne({ id: booktopData.contract_id}).exec((err, result) => {
                if(err || !result) return;
                
                result.booktops.push(booktopData)
                result.save();
            })
        
        })
        
        // event fired every time a new client connects:
        this.io.on("connection", (socket) => {
            console.info(`Client connected [id=${socket.id}]`);
            // initialize this client's sequence number
            sequenceNumberByClient.set(socket, 1);
        
            this.ws.on('message', (msg) => {
                socket.emit('message', msg);
            })
        
            // when socket disconnects, remove it from the list:
            socket.on("disconnect", () => {
                sequenceNumberByClient.delete(socket);
                console.info(`Client disconnected [id=${socket.id}]`);
            });
        
        });
    }
}

module.exports = WebsocketAPI;