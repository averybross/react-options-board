const mongoose = require('mongoose');
const fetch = require('node-fetch');

const { contractSchema, booktopSchema} = require('./schemas');
        
var Contract = mongoose.model('Contract', contractSchema);
var Booktop = mongoose.model('Booktop', booktopSchema);

class API {

    constructor() {

        this.handleRequest = this.handleRequest.bind(this);

        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        this.fetchContracts(new Date().toISOString())

        setInterval(() => {
            this.fetchContracts(new Date().toISOString())
            console.log('reset contracts');
        }, 1000 * 60 * 10)
    }
        
    getContracts() {
        return Contract.find({}).lean();
    }
    
    async fetchBooktops() {
        // return Booktop.find({}).lean();
        return (await fetch(`https://trade.ledgerx.com/api/book-tops`).then(res => res.json())).data;
    }
        
    async fetchContracts(after_ts) {
        const newContracts = (await fetch(`https://trade.ledgerx.com/api/contracts?after_ts=${after_ts}&limit=0&offset=0`)
            .then(res => res.json())).data;
            
        await Contract.deleteMany({});
        await Contract.insertMany(newContracts);
    }

    async handleRequest (req, res) {
    
        const contracts = await this.getContracts();
        const booktops = await this.fetchBooktops();
        
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

                if(!contract.booktops.length) {
                    firstBooktop[0].datetime = Date.now();
                    contract.booktops = [firstBooktop[0]];
                }
                

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
                    if(contract.active === 'true') {
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
    }
}

module.exports = API;