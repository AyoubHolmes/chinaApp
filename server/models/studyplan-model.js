const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudyPlan = new Schema(
    {
        userId: {
          type: String
        },
        degree: {
          type: String
        },
        major: {
          type: String
        }
    },
    {timestamps: true},
);

module.exports = mongoose.model('studyplan', StudyPlan);
