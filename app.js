const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require('body-parser')


const routeProducts = require('./routes/products')
const routeDemands = require('./routes/demands')
const routeUsers = require('./routes/users')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false})) // APENAS DADOS SIMPLES
app.use(bodyParser.json()) // APENAS DADOS EM JSON INICIALMENTE

app.use((req, res, next) =>{
      res.header('Acces-Control-Allow-Origin', '*')
      res.header('Acces-Control-Allow-Header',
      "Origin,X-Requrested-With, Content-Type, Accept, Authorization"
   )

   if (req.method === "OPTIONS"){
      res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH,DELETE,GET')
      return res.status(200).send({})
   }

   next()
})

app.use('/products', routeProducts)
app.use('/demands', routeDemands)
app.use('/users', routeUsers)

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