const FamilyData = require('../models/familydata-model');

createFamilyData = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        })
    }
    console.log('here');
    const familydata = new FamilyData(body);
    if (!familydata)
        return res.status(400).json({success: false, message: err})
    familydata
        .save()
        .then(() => res.status(201).json({
            success: true,
            id: familydata._id,
            message: 'familydata added successfully'
        }))
        .catch((err) => res.status(400).json({
            err,
            message: 'azer'
        }))
}

updateFamilyData = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    FamilyData.findOne({ userId: req.params.id }, (err, familydata) => {
        if (err)
            return res.status(404).json({ err, message: 'FamilyData not found' });
        familydata.fatherFname = body.fatherFname;
        familydata.fatherSname = body.fatherSname;
        familydata.fatherOccupation = body.fatherOccupation;
        familydata.fatherPhone = body.fatherPhone;
        familydata.motherFname = body.motherFname;
        familydata.motherSname = body.motherSname;
        familydata.motherOccupation = body.motherOccupation;
        familydata.motherPhone = body.motherPhone;
        
        familydata
            .save()
            .then(() => res.status(200).json({
                success: true,
                id: familydata._id,
                message: 'familydata updated successfully'
            }))
            .catch((error) => res.status(404).json({
                error,
                message: 'familydata not updated'
            }))
    })
}

deleteFamilyData = async (req, res) => {
    await FamilyData.findOneAndDelete({ userId: req.params.id }, (err, familyData) => {
        if(err)
            return res.status(400).json({ err});
        if(!familyData)
            return res.status(404).json({success: false, error: 'familyData not found'});
        return res.status(200).json({ success: true, familyData: familyData })
    }).catch(err => console.error(err));
}

getFamilyDataById = async (req, res) => {
    await FamilyData.findOne({ userId: req.params.id }, (err, familyData) => {
        if(err)
            return res.status(400).json({err});
        if(!familyData)
            return res.status(404).json({success: false, error: 'familyData not found'});
        return res.status(200).json({ success: true, familyData: familyData })
    }).catch(err => console.error(err));
}

getFamilyDatas = async (req, res) => {
    await FamilyData.find({}, (err, familyDatas) => {
        if(err)
            return res.status(400).json({err});
        if(!familyDatas)
            return res.status(404).json({success: false, error: 'familyDatas not found'});
        return res.status(200).json({ success: true, familyDatas: familyDatas })
    }).catch(err => console.error(err));
}

module.exports = {
    createFamilyData,
    updateFamilyData,
    deleteFamilyData,
    getFamilyDataById,
    getFamilyDatas
};
/*
{
	"userId": "123",
	"fatherFname": "testF",
	"fatherSname": "testS",
	"fatherOccupation": "testOccupation",
	"fatherPhone": "testPhone",
	"motherFname": "testF",
	"motherSname": "testS",
	"motherOccupation": "testOccupation",
	"motherPhone": "testPhone"
}
*/