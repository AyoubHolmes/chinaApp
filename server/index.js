const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const UserCtrl = require('./controllers/user-ctrl');
const EdDataCtr = require('./controllers/eddata-ctr');
const PrDataCtr = require('./controllers/prdata-ctr');
const path = require("path");
const fileupload = require('express-fileupload');


const serverPort = 5000;

const db = require('./db');

const userRouter = require('./routes/user-router');
const personalDataRouter = require('./routes/personaldata-router');
const familyDataRouter = require('./routes/familydata-router');
const edDataRouter = require('./routes/eddata-router');
const prDataRouter = require('./routes/prdata-router');
const studyPlanRouter = require('./routes/studyplan-router');


app.use(bodyParser.urlencoded({extended: true}))

app.use(fileupload({
    createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());


db.on('error', console.error.bind(console, 'MongoDB connection error: '));


app.use('/api', userRouter);
app.use('/api', personalDataRouter);
app.use('/api', familyDataRouter);
app.use('/api', edDataRouter);
app.use('/api', prDataRouter);
app.use('/api', studyPlanRouter);
app.use(express.static(path.join(__dirname, "../frontend/", "build")));
app.use('/login', express.static(path.join(__dirname, "../frontend/", "build")));
app.use('/signup', (req, res) => res.redirect('/login'));
app.use('/confirmation',express.static("confirmationmailpage"));
app.use('/application',express.static(path.join(__dirname, "../frontend/", "build")));
app.use('/application/*',express.static(path.join(__dirname, "../frontend/", "build")));
app.use('/main',express.static(path.join(__dirname, "../frontend/", "build")));
app.get ('/checkToken', UserCtrl.withAuth)
app.get('/confirm/user', UserCtrl.confirmUser);
app.get('/apply/user', UserCtrl.applyUser);
app.use('/user',express.static("form"));

app.post('/educational', async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            messgae: 'You must be logged in'
        });
    }
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file selected'
            })
        }
        else {
            const {file} = req.files
            file.mv ("./educationals/" + file.name)
            EdDataCtr.addDocuments(id, file.name)
            res.send({
                status: true,
                message: 'Educational document is uploaded'
            })
        }
    } catch (e) {
        res.status(500).send({
            status: false,
            message: 'Error, try again later or contact us'
        })
    }
});

app.post('/professional', async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            messgae: 'You must be logged in'
        });
    }
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file selected'
            })
        }
        else {
            const {file} = req.files
            file.mv ("./professionals/" + file.name)
            PrDataCtr.addDocuments(id, file.name)
            res.send({
                status: true,
                message: 'Professional document is uploaded'
            })
        }
    } catch (e) {
        res.status(500).send({
            status: true,
            message: 'Error, try again later or contact us'
        })
    }
});

app.post('/certificate', async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            messgae: 'You must be logged in'
        });
    }
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No files'
            })
        }
        else {
            const {file} = req.files
            file.mv ("./certificates" + file.name)
            PrDataCtr.addCertifs(id, file.name)
            res.send({
                status: true,
                message: 'Certification document is uploaded'
            })
        }
    } catch (e) {
        res.status(500).send({
            status: true,
            message: 'Error, try again later or contact us'
        })
    }
});

app.listen(serverPort);
