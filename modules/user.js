const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const user = sequelize.define(
    "user",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        moderator: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

//user.hasMany(note)

//user.hasMany(notification)

updateUsers = async () => {
    user.sync({ alter: true }) 
}

module.exports = user;
