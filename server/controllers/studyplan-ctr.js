const StudyPlan = require('../models/studyplan-model');

createStudyPlan = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        })
    }

    const studyplan = new StudyPlan(body);
    if (!studyplan)
        return res.status(400).json({success: false, message: err})
    studyplan
        .save()
        .then(() => res.status(201).json({
            success: true,
            id: studyplan._id,
            message: 'studyplan added successfully'
        }))
        .catch((err) => res.status(400).json({
            err,
            message: 'azer'
        }))
}

addDocuments = async (id, filename) => {
    let tmp = [];
    StudyPlan.findOne({ userId: id }, (err, studyplan) => {
        if (err)
            return ;
        if (studyplan) {   
            tmp = JSON.parse(studyplan.documents);
            tmp.push(filename);
            studyplan.documents = JSON.stringify(tmp);
            studyplan
                .save()
                .then(() => console.log('success'))
                .catch((err) => console.log('ERROR: ' + err))
        }
        else
            return ;
    })
}

updateStudyPlan = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    StudyPlan.findOne({ userId: req.params.id }, (err, studyplan) => {
        if (err)
            return res.status(404).json({ err, message: 'studyplan not found' });
        if (studyplan) {   
            studyplan.degree = body.degree;
            studyplan.major = body.major;
            studyplan
                .save()
                .then(() => res.status(200).json({
                    success: true,
                    id: studyplan._id,
                    message: 'studyplan updated successfully'
                }))
                .catch((error) => res.status(404).json({
                    error,
                    message: 'studyplan not updated'
                }))
        }
        else
            res.status(404).json({
                message: 'studyplan not Found'
            })
    })
}

deleteStudyPlan = async (req, res) => {
    await StudyPlan.findOneAndDelete({ _id: req.params.id }, (err, studyplan) => {
        if(err)
            return res.status(400).json({ err});
        if(!studyplan)
            return res.status(404).json({success: false, error: 'studyplan not found'});
        return res.status(200).json({ success: true, studyplan: studyplan })
    }).catch(err => console.error(err));
}

getStudyPlanById = async (req, res) => {
    await StudyPlan.findOne({ userId: req.params.id }, (err, studyplan) => {
        if(err)
            return res.status(400).json({err});
        if(!studyplan)
            return res.status(404).json({success: false, error: 'studyplan not found'});
        return res.status(200).json({ success: true, studyplan: studyplan })
    }).catch(err => console.error(err));
}

getStudyPlans = async (req, res) => {
    await StudyPlan.find({}, (err, studyplans) => {
        if(err)
            return res.status(400).json({err});
        if(!studyplans)
            return res.status(404).json({success: false, error: 'studyplans not found'});
        return res.status(200).json({ success: true, studyplans: studyplans })
    }).catch(err => console.error(err));
}

module.exports = {
    createStudyPlan,
    updateStudyPlan,
    deleteStudyPlan,
    getStudyPlanById,
    getStudyPlans,
    addDocuments
};