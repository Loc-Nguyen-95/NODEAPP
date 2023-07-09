const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const { check, body } = require('express-validator');
const User = require('../model/user');

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.'),
    // .normalizeEmail(), // senitizer (Lám sạch dữ liệu)
    body('password', 'Password has to be valid.')
    .isLength({min: 5})
    .isAlphanumeric()
    .trim()
], authController.postLogin); 

router.get('/signup', authController.getSignup);

router.post('/signup',

    //1. Email
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom( (value, {req} ) => {
        return User.findOne({email: value})
            .then(user => {
                if(user){
                    return Promise.reject('Email exists already, please pick a different one.')
                }
            })
            // .catch(err => console.log('err in signup: ', err))
    })
    // .custom(async value => {
    //     const user = await User.findOne({email: value})
    //     if(user){
    //         throw Error ('E-mail already in use')
    //     }
    // })
    .normalizeEmail(),

    //2. password
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
    .isLength({min: 5})
    .isAlphanumeric()
    .trim(),

    //3. Conform password
    body('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords have to match')
        }
        return true;
    }),

    authController.postSignup);

module.exports = router;