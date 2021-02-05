const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const sendMail = require('./mail');

createUser = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide your credentials'
        })
    }
    const newUser = new User(body);
    // change this
    newUser.isConfirmed = 'true';
    newUser.isApplied = 'false';
    newUser.ApplicationStat = 'Pending'
    if (!newUser)
        return res.status(400).json({success: false, message: err})
    await User.findOne({ email: newUser.email }, function(err, user) {
        if(!user)
        newUser
            .save()
            .then(() => {
                sendMail(newUser.email, newUser._id).catch(console.error);
                res.status(201).json({
                    success: true,
                    id: newUser._id,
                    message: 'user added successfully'
                })
            })
            .catch((err) => res.status(400).json({
                err,
                message: 'azer'
            }))
        else
            res.status(400).json({
                error: 'Email already exits'
            });
    });
}

updateUser = async (req, res) => {
    const body = req.body

    if(!body) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide a body'
        });
    }
    console.log(req.params.id);
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err)
            return res.status(404).json({ err, message: 'user not found' });
        user.name = body.name;
        user.password = body.password;
        user.phone = body.phone;
        user.address = body.address;
        user
            .save()
            .then(() => res.status(200).json({
                success: true,
                id: user._id,
                message: 'User updated successfully'
            }))
            .catch((error) => res.status(404).json({
                error,
                message: 'User not updated'
            }))
    })
}

confirmUser = async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide userId'
        });
    }
    User.findOne({ _id: id }, (err, user) => {
        if (err)
            return res.status(404).json({ err, message: 'user not found' });
        user.isConfirmed = 'true';
        user
            .save()
            .then(() => res.redirect('http://161.35.129.190/login')
            )
            .catch((error) => res.status(404).json({
                error,
                message: 'User not confirmed'
            }))
    })
}

applyUser = async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            messgae: 'You must provide userId'
        });
    }
    User.findOne({ _id: id }, (err, user) => {
        if (err)
            return res.status(404).json({ err, message: 'user not found' });
        user.isApplied = 'true';
        user
            .save()
            .then(() => res.redirect('http://161.35.129.190/application?id=' + id))
            .catch((error) => res.status(404).json({
                error,
                message: 'User not applied'
            }))
    })
}

changeApplicationStatUser = async (id, change) => {
    if(!id)
        return { success: false, message: 'no id' };
    User.findOne({ _id: id }, (err, user) => {
        if (err)
            return { success: false, message: 'user not found' };
        user.ApplicationStat = change;
        user
            .save()
            .then(() => {
                return { success: true, message: 'change done!' }
            })
            .catch((error) => {
                return { success: false, message: 'change not done!' }
            })
    })
}

deleteUser = async (req, res) => {
    console.log(req.params.id);
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if(err)
            return res.status(400).json({ err});
        if(!user)
            return res.status(404).json({success: false, error: 'user not found'});
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.error(err));
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if(err)
            return res.status(400).json({ err});
        if(!user)
            return res.status(404).json({success: false, error: 'user not found'});
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.error(err));
}

getIdByEmail = async (req, res) => {
    await User.findOne({ email: req.params.email }, (err, user) => {
        if(err)
            return res.status(400).json({ err});
        if(!user)
            return res.status(404).json({success: false, error: 'user not found'});
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.error(err));
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if(err)
            return res.status(400).json({ err});
        if(!users)
            return res.status(404).json({success: false, error: 'users not found'});
        return res.status(200).json({ success: true, users: users })
    }).catch(err => console.error(err));
}
// ------------------------- authentification -------------------
const secret = 'newSecret';
authUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    await User.findOne({ email: email }, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!user) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500)
                .json({
                  error: 'Internal error please try again'
              });
            }
            else if (!same) {
              res.status(401)
                .json({
                  error: 'Incorrect email or password'
              });
            }
            else if(user.isConfirmed === 'true'){
                console.log(user)
                const id = user._id;
                const payload = { id };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                console.log('here1');
                res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                res.sendStatus(200);
            }
            else if (user.isConfirmed === 'false') {
                res.status(401)
                .json({
                  error: 'User not confirmed'
              });
            }
          });
        }
      });
}

withAuth = (req, res, next) => {
    console.log('\n')
    const token = req.cookies.token;
    console.log(req.cookies)
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
          req.id = decoded.id;
          console.log("here 2")
          console.log(decoded.id);
          res.status(200).json({
            success: true,
            id: decoded.id,
            message: 'Token exists'
        })
        }
      });
    }
}

// ----------------------------------------------------

module.exports = {
    createUser,
    updateUser,
    confirmUser,
    applyUser,
    deleteUser,
    getUserById,
    getIdByEmail,
    getUsers,
    authUser,
    withAuth,
    changeApplicationStatUser
};