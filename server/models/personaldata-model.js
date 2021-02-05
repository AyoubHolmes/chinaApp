const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonalData = new Schema(
    {
        userId: {
          type: String,
          required: true
        },
        fullname: {
          type: String,
          required: true
        },
        phone: {
          type: String,
          required: true
        },
        gender: {
          type: String,
          required: true
        },
        birthdate: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        passport: {
          type: String,
          required: true
        },
        passportIssue: {
          type: String,
          required: true
        },
        passportExpiry: {
          type: String,
          required: true
        },
        studied: {
          type: String,
          required: true
        },
        studiedCity: {
          type: String
        },
        studiedUniversity: {
          type: String
        },
        studiedMajor: {
          type: String
        }
    },
    {timestamps: true},
);

module.exports = mongoose.model('personaldata', PersonalData);
