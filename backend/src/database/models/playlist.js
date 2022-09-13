'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate = (models) => {
            // Playlist.belongsTo(models.Users, {
            //     foreingKey: 'userId',
            //     as: 'user'
            // });
            // Playlist.belongsTo(models.Type, {
            //     foreingKey: 'typeId',
            //     as: 'type'
            // });
        };
    }
    Playlist.init(
        {
            typeId: DataTypes.INTEGER,
            itemId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            name: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Playlist'
        }
    );
    Playlist.sync();
    return Playlist;
};
