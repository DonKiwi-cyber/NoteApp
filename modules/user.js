const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const user = sequelize.define(
    "user",
    {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(20),
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

const updateUsers = async () => {
    user.sync({ alter: true }) 
}
updateUsers;

module.exports = user;
