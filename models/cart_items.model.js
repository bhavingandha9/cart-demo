
const { DataTypes } = require('sequelize')
const { sequelize, Sequelize } = require('./../helpers/sequelize')
const Cart = require('./cart.model')

class CartItems extends Sequelize.Model { }

CartItems.init({
  id: { type: DataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  iCartId: {
    type: DataTypes.INTEGER(11),
    references: {
      model: Cart,
      key: 'id'
    },
    allowNull: false
  },
  sProductName: { type: DataTypes.STRING(45), allowNull: false },
  nPrice: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 }, // should be inherited from product
  iProductId: { type: DataTypes.INTEGER(11), defaultValue: 0 },
  nQuantity: { type: DataTypes.INTEGER(3), defaultValue: 1 },
  nSubTotal: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 },
  nTotal: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 },
  nDiscount: { type: DataTypes.FLOAT(9, 2), defaultValue: 0 }
}, {
  sequelize,
  createdAt: 'dCreatedAt',
  updatedAt: 'dUpdatedAt',
  tableName: 'cart_items',
  indexes: [
    {
      fields: ['iCartId', 'dCreatedAt', 'iProductId']
    }
  ]
})
// CartItems.belongsTo(Cart)
CartItems.sync()

module.exports = CartItems
