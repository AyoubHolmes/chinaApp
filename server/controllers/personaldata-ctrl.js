const PersonalData = require('../models/personaldata-model');

createPersonalData = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        })
    }

    const personaldata = new PersonalData(body);
    if (!personaldata)
        return res.status(400).json({success: false, message: err})
    personaldata
        .save()
        .then(() => res.status(201).json({
            success: true,
            id: personaldata._id,
            message: 'Personaldata added successfully'
        }))
        .catch((err) => res.status(400).json({
            err,
            message: 'azer'
        }))
}

updatePersonaldata = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    console.log(req.params.id);
    PersonalData.findOne({ userId: req.params.id }, (err, personaldata) => {
        if (err)
            return res.status(404).json({ err, message: 'PersonalData not found' });
        if (personaldata) {   
            personaldata.fullname = body.fullname;
            // personaldata.email = body.email;
            personaldata.phone = body.phone;
            personaldata.gender = body.gender;
            personaldata.birthdate = body.birthdate;
            personaldata.city = body.city;
            personaldata.address = body.address;
            personaldata.passport = body.passport;
            personaldata.passportIssue = body.passportIssue;
            personaldata.passportExpiry = body.passportExpiry;
            personaldata.studied = body.studied;
            personaldata.studiedCity = body.studiedCity;
            personaldata.studiedUniversity = body.studiedUniversity;
            personaldata.studiedMajor = body.studiedMajor;
            personaldata
                .save()
                .then(() => res.status(200).json({
                    success: true,
                    id: personaldata._id,
                    message: 'PersonalData updated successfully'
                }))
                .catch((error) => res.status(404).json({
                    error,
                    message: 'PersonalData not updated'
                }))
        }
        else
            res.status(404).json({
                message: 'PersonalData not Found'
            })
    })
}

deletePersonalData = async (req, res) => {
    await PersonalData.findOneAndDelete({ _id: req.params.id }, (err, personaldata) => {
        if(err)
            return res.status(400).json({ err});
        if(!personaldata)
            return res.status(404).json({success: false, error: 'personaldata not found'});
        return res.status(200).json({ success: true, personaldata: personaldata })
    }).catch(err => console.error(err));
}

getPersonalDataById = async (req, res) => {
    await PersonalData.findOne({ userId: req.params.id }, (err, personaldata) => {
        if(err)
            return res.status(400).json({err});
        if(!personaldata)
            return res.status(404).json({success: false, error: 'personaldata not found'});
        return res.status(200).json({ success: true, personaldata: personaldata })
    }).catch(err => console.error(err));
}

getPersonalDatas = async (req, res) => {
    await PersonalData.find({}, (err, personaldatas) => {
        if(err)
            return res.status(400).json({err});
        if(!personaldatas)
            return res.status(404).json({success: false, error: 'personaldatas not found'});
        return res.status(200).json({ success: true, personaldatas: personaldatas })
    }).catch(err => console.error(err));
}

module.exports = {
    createPersonalData,
    updatePersonaldata,
    deletePersonalData,
    getPersonalDataById,
    getPersonalDatas
};