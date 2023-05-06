const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT")
const {userModel} = require("../modules")

const userSession = async (req, res, next) => {
  try {

    if(!req.headers.authorization){
        handleHttpError(res, "NEED_SESSION", 401);
        return
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken =  await verifyToken(token);
    console.log('DT:', dataToken);
    if(!dataToken){
        handleHttpError(res, "No existe Payload", 401);
        return
    }

    const query = dataToken.email

    console.log(query)
    const user = await userModel.findOne({ where:{ email: query }})
    console.log(user)
    if (user.dataValues.email != req.body.email ){
      handleHttpError(res, "el email del token y el email introducido no coinciden")
      return
    }
    
    next()
    
  } catch (error) {
    console.log(error)
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = userSession;