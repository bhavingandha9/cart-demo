const Sequelize = require('sequelize')

// const sequelize = new Sequelize('cart_demo', 'root', 'qwerty@123', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
//   dialectOptions: { multipleStatements: true },
//   pool: {
//     max: 50,
//     min: 5,
//     handleDisconnects: true
//   }
// })
const sequelize = new Sequelize(process.env.JAWSDB_URL || 'mysql://root:qwerty%40123@localhost:3306/cart_demo', {
  dialect: 'mysql',
  logging: false,
  dialectOptions: { multipleStatements: true },
  pool: {
    max: 50,
    min: 5,
    handleDisconnects: true
  }
})
sequelize
  .authenticate()
  .then()
  .catch(error => console.log(error))

module.exports = {
  sequelize,
  Sequelize
}
