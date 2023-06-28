import DataTypes from 'sequelize'
import sequelize from '../connection.js';

const Artwork = sequelize.define('Artwork', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: Artist,
    //   key: 'id'
    // }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

export default Artwork
