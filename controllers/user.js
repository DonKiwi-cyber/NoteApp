//Importaciones
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { generateToken } = require("../utils/handleJWT")
const { handleHttpError } = require("../utils/handleError")
const { userModel } = require("../modules")

/**
 * Crea a un nuevo usuario, además de encriptar su contraseña y genera un token que le permitirá acceder a los métodos de la API
 * @param {*} req email y contraseña del usuario
 * @param {*} res token de acceso
 */
const register = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password)
        const body = {...req, password }
        const findUser = await userModel.findOne({where:{email: req.email}})
        if (findUser){
            handleHttpError(res, "Este usuario ya existe")
        }
        const userData = await userModel.create(body)
        //userData.set("password", undifined, {strict: false})

        const data = {
            "token": await generateToken(userData),
            "user": userData,
        }

        res.status(201)
        res.send({ data })

    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al registrar al usuario", 403)
    }
}

/**
 * Valida si el usuario ingresado existe; en tal caso de existir, se le devolverá un token para acceder a la aplicación y a sus métodos
 * @param {*} req email y contraseña del usuario
 * @param {*} res token de acceso
 */
const login = async (req, res) => {
    try{
        req = matchedData(req)
        const user = await userModel.findOne({where:{email: req.email}})
        if(!user){
            handleHttpError(res, "El usuario al que intenta acceder no existe", 404)
            return
        }
        const hashPassword = user.get("password")
        const check = await compare(req.password, hashPassword)
        if (!check){
            handleHttpError(res, "la contraseña es incorrecta", 401)
            return
        }
        const data = {
            "token": await generateToken(user),
            "user": user
        }

        res.status(200)
        res.send({data})

    } catch(error){
        console.log(error)
        handleHttpError(res, "error en el login de usuario")
    }
}

//TODOS devuelve la información de un usuario por medio del correo
/**
 * 
 * @param {*} req email del usuario
 * 
 */
const showData = async (req, res) => {
    try{
        //console.log( '🧧', req.body.email)
        const user = await userModel.findOne({where:{ email: req.body.email }})
        const data = {
            name: user.get("name"),
            email: user.get("email"),
            moderator: user.get("moderator"),
        }

        res.status(200)
        res.send({data})

    } catch(error){
        console.log(error)
        handleHttpError(res, "error al momento de devolver los datos")
    } 
}

/**
 * TODOS actualiza la información del usuario a excepción de su correo
 * @param {*} req es necesario que, además de los datos ingresados y el correo, se tenga un nuevo valor llamado "oldPassword" que será la antigua contraseña a cambiar
 * 
 */
const updateUser = async (req, res) => {
    try {
        const {oldPassword, email, ...body} = req
        const user = await userModel.findOne({where:{ email: email }})
        const hashPassword = user.get("password")
        const check = await compare(oldPassword, hashPassword)
        if (!check){
            handleHttpError(res, "la contraseña es incorrecta", 401)
            return
        }
        const password = await encrypt(req.password)
        const updatedData = {...body, password}
        const data = await userModel.findOneAndUpdate( email, updatedData )

        res.status(200)
        res.send({ data })
      
    } catch (error) {
        console.log(error)
        handleHttpError(res, "Error al actualizar el usuario");
    }
};

/**
 * Verifica si el usuario es un Moderador y devuelve un BOOLEAN dependiendo del resultado
 * @param {*} req email del usuario
 * @param {*} res boolean (true, false)
 * 
 */
const isModerator = async (req, res) => {
    try{
        const {moderator} = await userModel.findOne({ where:{ email: req.body.email }})

        res.status(200)
        res.send({moderator})

    } catch(error){
        handleHttpError(res, "Error para encontrar los permisos de moderador")
    }
}

module.exports = { register, login, showData, updateUser, isModerator }; 