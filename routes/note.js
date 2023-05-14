//Importaciones
const express = require("express")
const {
    publishNote,
    getNotes,
    getNoteByEmail,
    getWaitingNotes,
    updateNote,
    deleteNote,
    aproveNote,
} = require("../controllers/note")
const { 
    validatePublishNote, 
    validateReferenceNote, 
    validateUpdateNote,
    validateEmail 
} = require("../middlewares/validators/note")
const userSession = require("../middlewares/session")
const checkRol = require("../middlewares/rol")

//Iniciación del router
const router = express.Router()

//TODOS Métodos de usuario ordinario
router.post("/publishNote", userSession, validatePublishNote, publishNote)
router.get("/getNotes", userSession, getNotes)
router.get("/getNotesByEmail", userSession, validateEmail, getNoteByEmail)
router.put("/updateNote", userSession, validateUpdateNote, updateNote)
router.delete("/deleteNote", userSession, validateReferenceNote, deleteNote)


//TODOS Métodos de moderador
router.get("/getWaitingNotes", userSession, checkRol, getWaitingNotes)
router.put("/aproveNote", userSession, checkRol, validateReferenceNote, aproveNote)


module.exports = router;