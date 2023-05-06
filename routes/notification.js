const express = require("express")
const userSession = require("../middlewares/session")
const checkRol = require("../middlewares/rol")
const {
    createNoti,
    seeMyNotis,
} = require("../controllers/notification")
const {
    validateEmail,
    validateNoti
} = require("../middlewares/validators/notification")

const router = express.Router()

router.post("/createNoti", userSession, checkRol, validateNoti, createNoti)
router.get("/getMyNotis", userSession, validateEmail, seeMyNotis)

module.exports = router