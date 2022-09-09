'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate = (models) => {
            // Users.hasMany(models.Playlist, {
            //     foreingKey: 'userId',
            //     as: 'playlist'
            // });
        };
    }
    Users.init(
        {
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Users'
        }
    );
    Users.sync();
    return Users;
};
