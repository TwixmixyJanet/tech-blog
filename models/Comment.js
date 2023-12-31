// IMPORTS
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// See User.js for comments

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
            // Added validation args and msg to send better error respones
            validate: {
                len: {
                   args: [6, 200],
                   msg: 'Comment must be between 6-200 characters.',
                }
            },
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blogPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogPost',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;