const { check } = require("express-validator");
const validateResults = require("../../utils/handleValidators")

const validateNoti = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("email_addressee")
        .exists()
        .notEmpty()
        .isEmail(),
    check("title")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 30 }),
    check("body")
        .exists()
        .notEmpty()
        .isLength({ min: 1, max: 50 }),
    check("category")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validateEmail = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validateNoti, validateEmail };