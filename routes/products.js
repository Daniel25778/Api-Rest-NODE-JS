const express = require("express");
const router = express.Router()
const mysql = require("../msql").pool


// RETORNA TODOS OS PRODUTOS
router.get("/",(req, res, next) =>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error: error})}
            conn.query('SELECT * FROM products',
            (error, resultado, fields) => {
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    amount : resultado.length,
                    products: resultado.map(prod =>{
                        return{
                            id_products: prod.id_products,
                            name: prod.name,
                            price: prod.price,
                            request:{
                                method: 'GET',
                                description: '',
                                url: "http://localhost:3333/products/" + prod.id_products
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )   
    })
})

// INSERE UM PRODUTO
router.post("/",(req, res, next) =>{
    mysql.getConnection((error, conn)=> {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO products (name, price) VALUES (?,?)',
            [req.body.name, req.body.price],
            (error, result, field) => {
                conn.release()
                if(error){ return res.status(500).send({error: error})}
                res.status(201).send({
                    mensagem: "Product created succesfull",
                    id_product: result.insertId
                })
            }
        )
    })
})

// RETORNA OS DADOS DE UM PRODUTO
router.get("/:id_products",(req, res, next) =>{
    mysql.getConnection((error, conn)=>{
        if(error){ return res.status(500).send({error: error})}
            conn.query('SELECT * FROM products WHERE id_products = ?',
            [req.params.id_products],
            (error, resultado, fields) => {
                if(error){ return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )   
    })
})

// ALTERA OS PRODUTOS
router.patch("/",(req, res, next) =>{
    mysql.getConnection((error, conn)=> {
        conn.query(
            `UPDATE products
                SET name    = ?,
                    price   = ?
            WHERE id_products = ?`,
            [
                req.body.name, 
                req.body.price,
                req.body.id_product
            ],
            (error, result, field) => {
                conn.release()
                if(error){ return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: "Product changed succesfull",
                })
            }
        )
    })
})

// DELETA OS PRODUTOS
router.delete("/:id_products",(req, res, next) =>{
    mysql.getConnection((error, conn)=> {
        conn.query(
            `DELETE FROM products WHERE id_products = ?`,
            [
                req.params.id_products
            ],
            (error, result, field) => {
                conn.release()
                if(error){ return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: "Product deleted succesfull",
                })
            }
        )
    })
})


module.exports = router