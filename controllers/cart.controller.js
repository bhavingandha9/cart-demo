const { literal } = require('sequelize')
const CartModel = require('./../models/cart.model')
const CartItemsModel = require('./../models/cart_items.model')

const addCartItem = async (req, res) => {
  try {
    let cart = await CartModel.findOne({
      where: {
        iUserId: req.user.id
      }
    })
    if (!cart) {
      cart = await CartModel.create({
        iUserId: req.user.id
      })
    }

    const cartItem = await CartItemsModel.findOne({
      iCartId: cart.id,
      iProductId: req.body.iProductId
    })

    if (!cartItem) {
      const nSubTotal = (req.body.nQuantity * req.body.nPrice)
      const nTotal = nSubTotal - req.body.nDiscount
      await CartItemsModel.create({
        iCartId: cart.id,
        iProductId: req.body.iProductId,
        sProductName: req.body.sProductName,
        nQuantity: req.body.nQuantity,
        nDiscount: req.body.nDiscount, // need to be get from offers
        nPrice: req.body.nPrice, // need to get from products table
        nTotal,
        nSubTotal
      })

      // update the main cart
      await CartModel.update(
        {
          nTotal: literal(`nTotal + ${nTotal}`),
          nSubTotal: literal(`nSubTotal + ${nSubTotal}`),
          nDiscounts: literal(`nDiscounts + ${req.body.nDiscount}`)
        },
        {
          where: {
            id: cart.id
          }
        }
      )
    } else {
      return res.status(400).jsonp({
        message: 'Cart item already exists'
      })
    }

    return res.status(200).jsonp({
      message: 'Cart added successfully'
    })
  } catch (error) {
    return res.status(500).jsonp({
      message: 'Something went wrong'
    })
  }
}

const getCart = async (req, res) => {
  try {
    const data = await CartModel.findOne({
      where: {
        iUserId: req.user.id
      },
      include: [CartItemsModel]
    })
    return res.status(200).jsonp({
      message: 'Cart view successfully',
      data
    })
  } catch (error) {
    return res.status(500).jsonp({
      message: 'Something went wrong'
    })
  }
}

const updateCartItemQuantity = async (req, res) => {
  try {
    const cart = await CartModel.findOne({
      where: {
        iUserId: req.user.id
      }
    })

    if (!cart) {
      return res.status(404).jsonp({
        message: 'Cart not found'
      })
    }

    const cartItem = await CartItemsModel.findOne({
      where: { id: req.params.id, iCartId: cart.id }
    })

    if (!cartItem) {
      return res.status(404).jsonp({
        message: 'Cart item not found'
      })
    }

    const diffQuantity = req.body.nQuantity - cartItem.nQuantity

    const diffSubTotal = (diffQuantity * cartItem.nPrice)
    const diffTotal = diffSubTotal
    await CartItemsModel.update(
      {
        nQuantity: literal(`nQuantity + ${diffQuantity}`),
        nSubTotal: literal(`nSubTotal + ${diffSubTotal}`),
        nTotal: literal(`nTotal + ${diffTotal}`),
        nDiscount: cartItem.nDiscount // need to calculate
      },
      {
        where: {
          id: cartItem.id
        }
      })

    await CartModel.update(
      {
        nSubTotal: literal(`nSubTotal + ${diffSubTotal}`),
        nTotal: literal(`nTotal + ${diffTotal}`)
      },
      {
        where: {
          id: cart.id
        }
      }
    )
    return res.status(200).jsonp({
      message: 'Cart updated successfully'
    })
  } catch (error) {
    return res.status(500).jsonp({
      message: 'Something went wrong'
    })
  }
}

const deleteCartItem = async (req, res) => {
  try {
    const cart = await CartModel.findOne({
      where: {
        iUserId: req.user.id
      }
    })

    if (!cart) {
      return res.status(200).jsonp({
        message: 'Cart not found'
      })
    }

    const cartItem = await CartItemsModel.findOne({
      where: { id: req.params.id, iCartId: cart.id }
    })

    if (!cartItem) {
      return res.status(200).jsonp({
        message: 'Cart item not found'
      })
    }
    await CartItemsModel.destroy({ where: { id: req.params.id, iCartId: cart.id } })

    // update main cart
    await CartModel.update(
      {
        nTotal: literal(`nTotal - ${cartItem.nTotal}`),
        nSubTotal: literal(`nSubTotal - ${cartItem.nSubTotal}`),
        nDiscounts: literal(`nDiscounts - ${cartItem.nDiscount}`)
      },
      {
        where: {
          id: cart.id
        }
      }
    )

    return res.status(200).jsonp({
      message: 'Cart deleted successfully'
    })
  } catch (error) {
    return res.status(500).jsonp({
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  addCartItem,
  getCart,
  updateCartItemQuantity,
  deleteCartItem
}
