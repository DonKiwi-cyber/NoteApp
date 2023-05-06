const { check } = require("express-validator");
const validateResults = require("../../utils/handleValidators")

const validatePublishNote = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("title")
        .exists()
        .notEmpty()
        .isLength({min: 1, max: 30}),
    check("body")
        .exists()
        .notEmpty()
        .isLength({min: 1, max: 100}),
    check("category")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validateUpdateNote = [
    check("id")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("title")
        .exists()
        .notEmpty()
        .isLength({min: 1, max: 30}),
    check("body")
        .exists()
        .notEmpty()
        .isLength({min: 1, max: 100}),
    check("category")
        .exists()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validateReferenceNote = [
    check("id")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validateEmail = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatePublishNote, validateReferenceNote, validateUpdateNote, validateEmail };