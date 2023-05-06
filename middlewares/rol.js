const { handleHttpError } = require("../utils/handleError")
const { userModel } = require("../modules")

const checkRol = async (req, res, next) => {
    try{
        const user = await userModel.findOne({ attributes:['moderator'], where:{ email: req.body.email}})
        if (user.moderator == false){
            handleHttpError(res, "Usted no tiene permiso para acceder a esta función", 403)
            return
        }
        next()
    } catch(error){
        console.log(error)
        handleHttpError(res, "Error al verificar los derechos de moderador del usuario")
    }
}

module.exports = checkRol