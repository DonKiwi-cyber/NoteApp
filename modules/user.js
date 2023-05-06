const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");
const note = require("./note");
const notification = require("./notification");

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

user.hasMany(note, {
    foreignKey: 'email',
})
note.belongsTo(user)

user.hasMany(notification, {
    foreignKey: 'email',
    foreignKey: 'email_adressee',
})
notification.belongsTo(user)

notification.sync({ alter: true }) 
module.exports = user;
