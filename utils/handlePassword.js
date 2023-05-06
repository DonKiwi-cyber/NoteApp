//Importación
const bcryptjs = require('bcryptjs')

// TODOS encripta una contraseña sin encriptar
const encrypt = async (simplePassword) => {
    const hash = await bcryptjs.hash(simplePassword, 10)
    return hash
};

// TODOS compara una contraseña normal y otra encriptada para confirmar si pertenecen
const compare = async (simplePassword, hashPassword) => {
    return await bcryptjs.compare(simplePassword, hashPassword)
};

//Exportación 
module.exports = { encrypt, compare };