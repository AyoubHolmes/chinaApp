const EdData = require('../models/eddata-model');

createEdData = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        })
    }
    console.log("test" + body);
    const eddata = new EdData(body);
    if (!eddata)
        return res.status(400).json({success: false, message: err})
    eddata
        .save()
        .then(() => res.status(201).json({
            success: true,
            id: eddata._id,
            message: 'eddata added successfully'
        }))
        .catch((err) => res.status(400).json({
            err,
            message: 'azer'
        }))
}

updateEdData = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    EdData.findOne({ userId: req.params.id }, (err, eddata) => {
        if (err)
            return res.status(404).json({ err, message: 'EdData not found' });
        eddata.majors = body.majors;
        eddata
            .save()
            .then(() => res.status(200).json({
                success: true,
                id: eddata._id,
                message: 'eddata updated successfully'
            }))
            .catch((error) => res.status(404).json({
                error,
                message: 'eddata not updated'
            }))
    })
}

addDocuments = async (id, filename) => {
    let tmp = [];
    EdData.findOne({ userId: id }, (err, eddata) => {
        if (err)
            return ;
        if (eddata) {   
            tmp = JSON.parse(eddata.documents);
            tmp.push(filename);
            eddata.documents = JSON.stringify(tmp);
            eddata
                .save()
                .then(() => console.log('success'))
                .catch((err) => console.log('ERROR: '))
        }
        else
            return ;
    })
}

deleteEdData = async (req, res) => {
    await EdData.findOneAndDelete({ userId: req.params.id }, (err, edData) => {
        if(err)
            return res.status(400).json({ err});
        if(!edData)
            return res.status(404).json({success: false, error: 'edData not found'});
        return res.status(200).json({ success: true, edData: edData })
    }).catch(err => console.error(err));
}

getEdDataById = async (req, res) => {
    await EdData.findOne({ userId: req.params.id }, (err, edData) => {
        if(err)
            return res.status(400).json({err});
        if(!edData)
            return res.status(404).json({success: false, error: 'edData not found'});
        return res.status(200).json({ success: true, edData: edData })
    }).catch(err => console.error(err));
}

getEdDatas = async (req, res) => {
    await EdData.find({}, (err, edDatas) => {
        if(err)
            return res.status(400).json({err});
        if(!edDatas)
            return res.status(404).json({success: false, error: 'edDatas not found'});
        return res.status(200).json({ success: true, edDatas: edDatas })
    }).catch(err => console.error(err));
}

module.exports = {
    createEdData,
    updateEdData,
    deleteEdData,
    getEdDataById,
    getEdDatas,
    addDocuments
};
