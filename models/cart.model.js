
const { DataTypes } = require('sequelize')
const { sequelize, Sequelize } = require('./../helpers/sequelize')
const CartItem = require('./cart_items.model')
class Cart extends Sequelize.Model { }

Cart.init({
  id: { type: DataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  iUserId: { type: DataTypes.STRING(24), allowNull: false },
  nTotal: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 },
  nSubTotal: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 },
  nDiscounts: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 },
  nTaxes: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 }
  // eStatus: { type: DataTypes.ENUM('open', 'closed', 'in-process'), allowNull: false, defaultValue: 'open' }
}, {
  sequelize,
  createdAt: 'dCreatedAt',
  updatedAt: 'dUpdatedAt',
  tableName: 'cart',
  indexes: [
    {
      fields: ['iUserId', 'dCreatedAt']
    }
  ]
})

Cart.hasMany(CartItem, { foreignKey: 'iCartId' })
CartItem.belongsTo(Cart, { foreignKey: 'iCartId' })

Cart.sync()
module.exports = Cart
