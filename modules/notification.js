const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");
const user = require("./user");

const notification = sequelize.define(
    "notification", 
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_addressee: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    "Normal", 
                    "Spam", 
                    "Desnudos o Actividad Sexual", 
                    "Violencia u organizaciones peligrosas", 
                    "Estafa o Fraude", 
                    "Incluye contenido violento o prohibido"]]
            }
        },
        categorySimple: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: true,
    },
);

module.exports = notification;