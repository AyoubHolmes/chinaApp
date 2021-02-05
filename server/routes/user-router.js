const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/user', UserCtrl.createUser);
router.post('/user/authenticate', UserCtrl.authUser);
router.put('/user/:id', UserCtrl.updateUser);
router.delete('/user/:id', UserCtrl.deleteUser);
router.get('/user/:id', UserCtrl.getUserById);
router.get('/userid/:email', UserCtrl.getIdByEmail);
router.get('/users', UserCtrl.getUsers);
router.get('/secret', UserCtrl.withAuth, function(req, res) {
    console.log('Done')
    res.send('The password is potato');
  });
  

  
module.exports = router;