const express = require("express");
const router = express.Router()


// RETORNA TODOS OS PEDIDOS
router.get("/",(req, res, next) =>{
    res.status(200).send({
        mensagem: "Return all demands"
    })
})

// INSERE UM PEDIDO
router.post("/",(req, res, next) =>{
    res.status(201).send({
        mensagem: "Add a demand"
    })
})

// RETORNA OS DADOS DE UM PEDIDO
router.get("/:id_demand",(req, res, next) =>{
    const id = req.params.id_demand

    if (id === 'special') {
        res.status(200).send({
            mensagem: "You passed a special id",
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: "You passed a id",
            id: id
        })
    }
})

// DELETA OS PEDIDO
router.delete("/",(req, res, next) =>{
    res.status(201).send({
        mensagem: "Delete a demand"
    })
})


module.exports = router