const isUserAuthenticated = async (req, res, next) => {
  try {
    // check token and authentication here
    req.user = {
      id: 50,
      username: 'bhavin'
    }
    next()
  } catch (error) {
    return res.status(500).jsonp({
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  isUserAuthenticated
}
