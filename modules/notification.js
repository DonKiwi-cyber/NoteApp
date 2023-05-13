const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const notification = sequelize.define(
    "notification", 
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            },
        },
        email_addressee: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            },
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
updateNotis = async () => {
    notification.sync({ alter: true })
}

module.exports = notification;