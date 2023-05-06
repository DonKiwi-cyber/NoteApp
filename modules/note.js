const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const note = sequelize.define(
    "note",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    "Deportivo", 
                    "Academico", 
                    "Informativo", 
                    "Social", 
                    "Otro"]],
            },
        },
        categorySimple: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        timestamps: true,
    },
);

note.sync({ alter: true })
module.exports = note;