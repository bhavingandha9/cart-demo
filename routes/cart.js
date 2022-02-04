const router = require('express').Router()
const CartController = require('../controllers/cart.controller')
const { isUserAuthenticated } = require('../helpers/auth.middleware')
const validator = require('../validators/cart.validators')

router.post('/cart-item', validator.addCartItem, isUserAuthenticated, CartController.addCartItem)
router.put('/cart-item/:id', validator.updateCartItem, isUserAuthenticated, CartController.updateCartItemQuantity)
router.delete('/cart-item/:id', isUserAuthenticated, CartController.deleteCartItem)
router.get('/cart', isUserAuthenticated, CartController.getCart)

module.exports = router
