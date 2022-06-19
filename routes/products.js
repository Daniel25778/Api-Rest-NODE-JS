const express = require("express");
const router = express.Router()
const mysql = require("../msql").pool


// RETORNA TODOS OS PRODUTOS
router.get("/",(req, res, next) =>{
    res.status(200).send({
        mensagem: "Return all products"
    })
})

// INSERE UM PRODUTO
router.post("/",(req, res, next) =>{

    // const product = {
    //     name : req.body.name,
    //     price : req.body.price,
    // }

    mysql.getConnection((error, conn)=> {
        conn.query(
            'INSERT INTO products (name, price) VALUES (?,?)',
            [req.body.name, req.body.price],
            (error, result, field) => {
                conn.release()
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem: "Product created succesfull",
                    id_product: result.insertId
                })
            }
        )
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