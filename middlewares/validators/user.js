//Importaciones
const { check } = require("express-validator");
const validateResults = require("../../utils/handleValidators")

//Los siguientes métodos verifican las condiciones de los valores para su introducción

const validatorRegister = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({min: 3, max: 40}),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25}),
    check("moderator")
        .exists()
        .notEmpty()
        .isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

//"oldPassword" sirve para validar la contraseña antigua y poder actualizarla con una nueva
const validatorUpdateUser = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({min: 3, max: 40}),
    check("oldPassword")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25}),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 5, max: 25}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin, validatorUpdateUser };