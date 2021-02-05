const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FamilyData = new Schema(
    {
        userId: {
          type: String,
          required: true
        },
        fatherFname: {
          type: String,
          required: true
        },
        fatherSname: {
          type: String,
          required: true
        },
        fatherOccupation: {
          type: String,
          required: true
        },
        fatherPhone: {
            type: String,
        },
        motherFname: {
            type: String,
            required: true
        },
        motherSname: {
            type: String,
            required: true
        },
        motherOccupation: {
            type: String,
            required: true
        },
        motherPhone: {
            type: String,
        }
    },
    {timestamps: true},
);

module.exports = mongoose.model('familydatas', FamilyData);
