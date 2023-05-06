//Importaciones
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { notificationModel, userModel } = require("../modules")
const { Op } = require("sequelize")

/**
 * Crea una notificación mientras que comprueba que los correos insertados sean correctos
 * @param {*} req 
 * @param {*} res 
 * 
 */
const createNoti = async (req, res) => {
    try{
        req = matchedData(req)
        const {email} = req
        const {email_addressee} = req
        const email_S = await userModel.findOne({ where:{ email: email }})
        const email_A = await userModel.findOne({ where:{ email: email_addressee }})
        if(!email_S){
            handleHttpError(res, "El correo del remitente introducido es incorrecto", 404)
            return
        }
        if(!email_A){
            handleHttpError(res, "El correo del destinatario introducido es incorrecto", 404)
            return
        }
        const data = await notificationModel.create(req)

        res.status(200)
        res.send({ data })

    } catch(error){
        handleHttpError(res, "Error al crear la notificación")
    }
}

const seeMyNotis = async (req, res) => {
    try{
        const email = req.body.email
        const validate = await userModel.findOne({ where:{ email: email}})
        if(!validate){
            handleHttpError(res, "No existe ningún usuario con este correo", 404)
            return
        }
        const notis = await notificationModel.findAll({ where:{ email_addressee: email}})
        if(!notis){
            handleHttpError(res, "no existen notificaciones para mostrar al usuario", 404)
            return
        }

        res.status(200)
        res.send({ notis })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al buscar las notificaciones del usuario")
    }
}

module.exports = { createNoti, seeMyNotis };