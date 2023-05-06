//Importaciones
const express = require("express")
const { validatorLogin, validatorRegister, validatorUpdateUser } = require("../middlewares/validators/user")
const { 
    login, 
    register, 
    showData, 
    isModerator, 
    updateUser } = require("../controllers/user")
const userSession = require("../middlewares/session")

//Iniciación del router
const router = express.Router()

//TODOS rutas a los controladores
router.post("/register", validatorRegister, register)
router.post("/login", validatorLogin, login)
router.get("/showData", userSession, showData)
router.get("/isModerator", userSession ,isModerator)
router.put("/updateUser", userSession, validatorUpdateUser, updateUser)


module.exports = router