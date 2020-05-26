const { Schema } = require("mongoose");

const BooktopSchema = new Schema({
    contract_id: Number,
    bid: Number,
    clock: Number,
    ask: Number,
    contract_type: String,
    datetime: Number,
})

const ContractSchema = new Schema({
    id: Number,
    name: String,
    booktops: [BooktopSchema],
    label: String,
    underlying_asset: String,
    collateral_asset: String,
    active: String,
    type: String,
    strike_price: Number,
    min_increment: String,
    date_live: String,
    date_expires: String,
    date_exercise: String,
    derivative_type: String,
    open_interest: String,
    is_one_day: String,
});

module.exports = {
    booktopSchema: BooktopSchema,
    contractSchema: ContractSchema
};