const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Comment extends Model {}

//create comment model
Comment.init( 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      //************ create a timestamp for when comment is posted ************//
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
get() {
  const timestamp = this.getDataValue('timestamp');
  const localTimestamp = moment.utc(timestamp).local();
  return localTimestamp.format('DD-MM-YYYY HH:mm:ss');

      }
    }
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
