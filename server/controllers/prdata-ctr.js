const PrData = require('../models/prdata-model');

createPrData = (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        })
    }
    const prdata = new PrData(body);
    if (!prdata)
        return res.status(400).json({success: false, message: err})
    prdata
        .save()
        .then(() => res.status(201).json({
            success: true,
            id: prdata._id,
            message: 'prdata added successfully'
        }))
        .catch((err) => res.status(400).json({
            err,
            message: 'azer'
        }))
}

updatePrData = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    PrData.findOne({ userId: req.params.id }, (err, prdata) => {
        if (err)
            return res.status(404).json({ err, message: 'PrData not found' });
        prdata.posts = body.posts;
        console.log(JSON.parse(body.posts));
        prdata.langCertif = body.langCertif;
        prdata
            .save()
            .then(() => res.status(200).json({
                success: true,
                id: prdata._id,
                message: 'prdata updated successfully'
            }))
            .catch((error) => res.status(404).json({
                error,
                message: 'prdata not updated'
            }))
    })
}

addDocuments = async (id, filename) => {
    let tmp = [];
    PrData.findOne({ userId: id }, (err, prdata) => {
        if (err)
            return ;
        console.log('here pro')
        if (prdata) {   
            tmp = JSON.parse(prdata.documents);
            tmp.push(filename);
            prdata.documents = JSON.stringify(tmp);
            prdata
                .save()
                .then(() => console.log('success'))
                .catch((err) => console.log('ERROR: '))
        }
        else
            return ;
    })
}

addCertifs = async (id, filename) => {
    let tmp = [];
    PrData.findOne({ userId: id }, (err, prdata) => {
        if (err)
            return ;
        console.log('here')
        if (prdata) {   
            tmp = JSON.parse(prdata.certifs);
            tmp.push(filename);
            prdata.certifs = JSON.stringify(tmp);
            prdata
                .save()
                .then(() => console.log('success'))
                .catch((err) => console.log('ERROR: '))
        }
        else
            return ;
    })
}

deletePrData = async (req, res) => {
    await PrData.findOneAndDelete({ userId: req.params.id }, (err, prData) => {
        if(err)
            return res.status(400).json({ err});
        if(!prData)
            return res.status(404).json({success: false, error: 'prData not found'});
        return res.status(200).json({ success: true, prData: prData })
    }).catch(err => console.error(err));
}

getPrDataById = async (req, res) => {
    await PrData.findOne({ userId: req.params.id }, (err, prData) => {
        if(err)
            return res.status(400).json({err});
        if(!prData)
            return res.status(404).json({success: false, error: 'prData not found'});
        return res.status(200).json({ success: true, prData: prData })
    }).catch(err => console.error(err));
}

getPrDatas = async (req, res) => {
    await PrData.find({}, (err, prDatas) => {
        if(err)
            return res.status(400).json({err});
        if(!prDatas)
            return res.status(404).json({success: false, error: 'prDatas not found'});
        return res.status(200).json({ success: true, prDatas: prDatas })
    }).catch(err => console.error(err));
}

module.exports = {
    createPrData,
    updatePrData,
    deletePrData,
    getPrDataById,
    getPrDatas,
    addDocuments,
    addCertifs
};
