const express = require("express");
const router = express.Router()
const mysql = require("../msql").pool
const bcrypt = require("bcrypt")

router.post("/register",(req, res, next) =>{
    mysql.getConnection((error, conn)=> {
        if(error){ return res.status(500).send({error: error})}
        conn.query(`SELECT * FROM user WHERE email = ?`,[req.body.email], (error, results)=>{
            if (error) { return res.status(500).send({error: error})}
            if (results.length > 0){
                res.status(409).send({
                    mensagem: "User alreary registered"
                })
            } else{
                bcrypt.hash(req.body.password, 10,(errBcript, hash)=>{
                    if (errBcript){ return res.status(500).send({error: errBcript})}
                    conn.query(
                        `INSERT INTO user(name,email,password) VALUES (?,?,?)`,
                        [req.body.name, req.body.email, hash],
                        (error, results) =>{
                            conn.release()
                            if (error) { return res.status(500).send({error: error})}
                            const response = {
                                mensagem: 'User registered with successfull',
                                userRegistered: {
                                    id_users: results.insertId,
                                    email : req.body.email,
                                    name: req.body.name
                                }
                            }
                            return res.status(201).send(response)
                        }
                    )
                })
            } 
        })
    })
})

module.exports = router