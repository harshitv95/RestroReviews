const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Restro = new Schema({
    title: { type: String },
    feedback: { type: Object },
    heroImageUrl: { type: String },
    categories: { type: Array },
    uuid: { type: String }
}, { collections: "restros" });

module.exports = mongoose.model('Restro', Restro);