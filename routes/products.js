const express = require("express");
const router = express.Router()


// RETORNA TODOS OS PRODUTOS
router.get("/",(req, res, next) =>{
    res.status(200).send({
        mensagem: "Return all products"
    })
})

// INSERE UM PRODUTO
router.post("/",(req, res, next) =>{
    res.status(201).send({
        mensagem: "Add a product"
    })
})

// RETORNA OS DADOS DE UM PRODUTO
router.get("/:id_product",(req, res, next) =>{
    const id = req.params.id_product

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

// ALTERA OS PRODUTOS
router.patch("/",(req, res, next) =>{
    res.status(201).send({
        mensagem: "Edit a product"
    })
})

// DELETA OS PRODUTOS
router.delete("/",(req, res, next) =>{
    res.status(201).send({
        mensagem: "Delete a product"
    })
})


module.exports = router