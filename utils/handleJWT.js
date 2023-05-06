// importaciones
const jwt = require("jsonwebtoken")
const {config} = require("dotenv")

config();

const jwtPassword = process.env.JWT

// TODOS método que crea el token firmado junto con la definición de sus parámetros
const generateToken = async (user) => {
    const sign = jwt.sign(
        {
            email: user.email,
            moderator: user.moderator
        },
        jwtPassword,
        {
            expiresIn: '3h',
        },
    );

    return sign
};

// TODOS valida si el token pertenece a la contraseña
const verifyToken = async (tokenJWT) => {
    try {
        //return jwt.verify(tokenJWT, jwtPassword)
        tokenJWT = tokenJWT.replace(/['"]+/g, '')
        console.log(tokenJWT)
        return jwt.verify(tokenJWT, jwtPassword)
    } catch (error){
        console.log(error)
        return null
    }
};


module.exports = { generateToken, verifyToken };