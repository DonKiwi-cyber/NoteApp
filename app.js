//Importaciones
const express = require("express")
const cors = require("cors")
const {dbConnection} = require("./config/mysql")

//Puerto de Node JS
const port = process.env.PORT || 3000

//Inicio de aplicación
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", require("./routes"))

app.listen(port)

dbConnection()

