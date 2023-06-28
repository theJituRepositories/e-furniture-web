import DataTypes from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../connection.js'

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isArtist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Artists',
        key: 'id'
      }
    }
  },
  {
    timestamps: true
  }
)

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

User.beforeCreate(async user => {
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

export default User
