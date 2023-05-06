//Importación de Sequelize
const { Sequelize } = require("sequelize")
const {config} = require("dotenv")

config();
// TODOS definición de datos de conexión a DB
const db_name = process.env.DB_NAME 
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST

// TODOS instanciación de sequelize
const sequelize = new Sequelize(db_name, user, password, {
    host: host,
    dialect: "mysql",
    operationsAliases: false,
	pool: {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 100000,
	}
})

// TODOS autenticar conexión a MSQL
const dbConnection = async () => {
    try{
        await sequelize.authenticate()
        console.log("CONEXIÓN CORRECTA A MYSQL")
    } catch(err){
        console.log("ERROR DE CONEXIÓN", err)
    }
}

module.exports = {
    sequelize,
    dbConnection
}