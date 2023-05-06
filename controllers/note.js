const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { noteModel } = require("../modules")
const { Op } = require("sequelize")

/**
 * Devuelve todas las notas de la BD
 * @param {*} req petición 
 * @param {*} res todas las notas
 * 
 */
const getNotes = async (req, res) => {
    try {
        console.log(req.body.email)
        const notes = await noteModel.findAll({attributes: [
            'id', 
            'email', 
            'title', 'body', 
            'category',	
            'categorySimple', 
            'published', 
            'createdAt',
            'updatedAt'	
    ], 
    where: { published: true }})
        console.log('NOTAS:', notes);
        if(!notes){
            handleHttpError(res, "No existen notas aprobadas para mostrar", 404)
            return
        }

        res.status(200)
        res.send({ notes })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al mostrar las notas existentes")
    }
}

/**
 * Devuelve los datos de las notas generadas por un usuario específico
 * @param {*} req email del usuario
 * @param {*} res notas del usuario
 * 
 */
const getNoteByEmail = async (req, res) => {
    try {
        const email = req.body.email
        const notes = await noteModel.findAll({attributes: [
            'id', 
            'email', 
            'title', 'body', 
            'category',	
            'categorySimple', 
            'published', 
            'createdAt',
            'updatedAt'	
    ], 
    where:{ email: email }})
        if(!notes){
            handleHttpError(res, "No existen notas creadas por este usuario", 404)
            return
        }

        res.status(200)
        res.send({ notes })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al mostrar las notas del usuario")
    }
}

/**
 * Devuelve cualquier nota que tenga el valor False en el parámetro "published"
 * @param {*} req petición de usuario
 * @param {*} res notas no publicadas en la app principal
 * 
 */
const getWaitingNotes = async (req, res) => {
    try {
        const notes = await noteModel.findAll({attributes: [
            'id', 
            'email', 
            'title', 'body', 
            'category',	
            'categorySimple', 
            'published', 
            'createdAt',
            'updatedAt'	
    ], 
    where: {published: false}})
        if(!notes){
            handleHttpError(res, "No hay notas en espera", 404)
            return
        }

        res.status(200)
        res.send({ notes })
    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al mostrar las notas en espera")
    }
}

/**
 * Crea una nota en la BD a partir de datos introducidos
 * @param {*} req datos de la nota
 *
 */
const publishNote = async (req, res) => {
    try {
        req = matchedData(req)
        if(!req){
            handleHttpError(res, "No existen datos a introducir", 204)
            return
        }
        const categorySimple = req.category
        const note = {...req, categorySimple}
        const data = await noteModel.create(note)

        res.status(201)
        res.send({ data })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al publicar la nota")
    }
}

/**
 * Actualiza el estado de "published" de una nota de false a true para que pueda ser visualizado en la aplicación front
 * @param {*} req ID nota, además del email del moderador
 *
 */
const aproveNote = async (req, res) => {
    try {
        const id = await noteModel.findOne({attributes:['id'], where: {id: req.body.id}})
        if(!id){
            handleHttpError(res, "No existe la nota referenciada", 404)
            return
        }
        const publishItem = await noteModel.update({ published: true }, { where: {id: id.id}})

        res.status(200)
        res.send({ publishItem })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al actualizar el estado de la nota")
    }
}

/**
 * Actualiza os datos de una nota específica
 * @param {*} req datos de la nota, incluyendo ID
 * 
 */
const updateNote = async (req, res) => {
    try{
        req = matchedData(req)
        const id = req.id
        const email = req.email
        const note = await noteModel.findOne({attributes:['id'], where: {[Op.and]: [{id: id}, {email: email}]}})
        if(!note){
            handleHttpError(res, "No existe una nota referenciada", 404)
            return
        }
        await noteModel.update({ 
            published: false,
            title: req.title,
            body: req.body,
            category: req.category,
            categorySimple: req.category
        }, { where: {id: id}})

        res.status(200)
        res.send("La nota se ha actualizado exitosamente")
    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al actualizar los datos de la nota")
    }
}

/**
 * Eliminará una nota de la BD
 * @param {*} req id e email de la nota
 * 
 */
const deleteNote = async(req, res) => {
    try{
        console.log(req.body)
        const id = await noteModel.findOne({ attributes:['id'], where: {id: req.body.id}})
        if(!id){
            handleHttpError(res, "No existe una nota con este ID", 404)
        }
        await noteModel.destroy({ where: {id: req.body.id}})

        res.status(200)
        res.send("nota eliminada con éxito")
    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al eliminar la nota deseada")
    }
}

//Exportaciones
module.exports = { publishNote, getNotes, getNoteByEmail, getWaitingNotes, aproveNote, updateNote, deleteNote }