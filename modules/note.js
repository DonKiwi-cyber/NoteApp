const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const note = sequelize.define(
    "note",
    {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            }
        },
        title: {
            type: DataTypes.STRING(25),
        },
        body: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(15),
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
) ;
const updateNotes = async () => {
    note.sync({ alter: true })
}
updateNotes

module.exports = note;