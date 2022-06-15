const express = require("express")
const app = express()
const morgan = require("morgan")

const routeProducts = require('./routes/products')
const routeDemands = require('./routes/demands')

app.use(morgan('dev'))

app.use('/products', routeProducts)
app.use('/demands', routeDemands)

app.use((req, res, next) =>{
   const erro = new Error('Not found')
   erro.status = 404
   next(erro)
})


app.use((error, req, res, next) =>{
   res.status(error.status || 500)
   return res.send({
      mensagem: error.message
   })
})


module.exports = app