import { Sequelize, DataTypes } from 'sequelize'
import connectDB from '../connection.js'

const Order = connectDB.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentResult: {
      type: DataTypes.JSON
    },
    taxPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    shippingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    paidAt: {
      type: DataTypes.DATE
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deliveredAt: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'orders'
  }
)

export default Order
