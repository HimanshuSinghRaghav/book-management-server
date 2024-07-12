import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define('Books' , {
  title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    genre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    coverImage:{
      type:DataTypes.STRING,
      allowNull:false,
  },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
},{timestamps:false});

export default Book