const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const notification = sequelize.define(
    "notification", 
    {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            },
        },
        email_addressee: {
            type: DataTypes.STRING(40),
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            },
        },
        title: {
            type: DataTypes.STRING(25),
        },
        body: {
            type: DataTypes.STRING(100)
        },
        category: {
            type: DataTypes.STRING(40),
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
const updateNotis = async () => {
    notification.sync({ alter: true })
}
updateNotis

module.exports = notification;