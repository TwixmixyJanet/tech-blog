// IMPORTS
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    // Function to check password in bcrypt to password entered
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// Initiate the sequelize database parameters
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                // verifies if email format
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // limit password length
                len: [8],
            },
        },
    },
    {
        hooks: {
            // Sequelize hooks used to hash the password of user before it is created or updated
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        // tells which instance the model should be associated with, see "user" below.
        sequelize,
        // Prevents sequeluze from creting timestamp for this model
        timestamps: false,
        // Prevents sequelize from pluralizing the model name
        freezeTableName: true,
        // Tells sequlize to use snake_case for column names
        underscored: true,
        // Tells sequelize the model name
        modelName: "user",
    }
);

// EXPORT
module.exports = User;