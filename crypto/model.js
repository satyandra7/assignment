const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    current_price : {
        type : Number,
        required : true
    },
    market_cap : {
        type : Number,
        required : true
    },
    price_change_24h : {
        type : Number,
        required : true
    },

},{ timestamps: true });

module.exports = mongoose.model('Crypto', cryptoSchema);