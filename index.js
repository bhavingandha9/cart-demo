const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cartRouter = require('./routes/cart')
app.use(bodyParser.json())

app.use('/api/v1', [cartRouter])
app.listen(process.env.PORT ? process.env.PORT : 3000, () => {
  console.log(`Magic happens on port :${process.env.PORT ? process.env.PORT : 3000}`)
})
