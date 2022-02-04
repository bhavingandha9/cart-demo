const { body } = require('express-validator')

const addCartItem = [
  body('iProductId').not().isEmpty().withMessage('Product id is required'),
  body('nQuantity').not().isEmpty().withMessage('Quantity is required'),
  body('nPrice').not().isEmpty().withMessage('Price is required'),
  body('sProductName').not().isEmpty().withMessage('Product name is required'),
  body('nDiscount').not().isEmpty().withMessage('Discount is required')
]

const updateCartItem = [
  body('nQuantity').not().isEmpty().withMessage('Quantity is required')
]

module.exports = {
  addCartItem,
  updateCartItem
}
