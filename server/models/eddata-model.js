const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Majors = new Schema({
  edFrom: String,
  edTo: String,
  edInstitute: String,
  edDegree: String,
  edMajor: String
})

const EdData = new Schema(
    {
        userId: {
          type: String,
          required: true
        },
        majors: {
          type: String
        },
        documents: {
          type:String
        }
    },
    {timestamps: true},
);


module.exports = mongoose.model('eddata', EdData);
