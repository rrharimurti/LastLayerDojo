const mongoose = require("mongoose")

// Schema for Each Algorithms

const Schema = mongoose.Schema

const algoSchema = new Schema({
    username: {type: String, required: true},
    /* 
    Index is used as an ID to identify algorithms
    0-56: OLL Algorithms in Ascending Numerical Order
    57-77: PLL Algorithms in Alphabetical Order
    */
    index: {type: Number, min: 0, max: 77, required: true},
    main_algo: {type: String},
    alt_algo: {type: String},
    time: {type: Number, required: true}
})

// Make Sure that there is 1 Index per 

algoSchema.index({ username: 1, index: 1 }, { unique: true });

const Algorithm = mongoose.model('Algorithm', algoSchema)

module.exports = Algorithm;