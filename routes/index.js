// Importaciones
const express = require("express")
const fs = require("fs");
const router = express.Router()

//Define el objeto como la carpeta actual

// TODOS extrae los nombres planos de los archivos de las rutas 
const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

//Extrae las rutas del directorio actual
fs.readdirSync("./modules").filter((file) => {
    const name = removeExtension(file)//TODO user, note, notification
    if(name !== 'index'){
        console.log(`Cargando ruta ${name}`)
        router.use(`/${name}`, require(`./${file}`)) //TODO http://localhost:3000/api/?
    }
})

module.exports = router