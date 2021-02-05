const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrData = new Schema(
    {
        userId: {
          type: String,
          required: true
        },
        posts: {
          type: String
        },
        langCertif: {
            type: String
        },
        documents: {
          type:String
        },
        certifs: {
          type:String
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model('prdata', PrData);
