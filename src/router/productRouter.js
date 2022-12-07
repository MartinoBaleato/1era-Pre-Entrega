import express from "express";
import ProductManager from "../controllers/productManager.js";
const router = express.Router()
const manager = new ProductManager()

let isAdmin = true

router.get("/",(req,res)=>{
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => res.send({error:0, descripcion: err}))
})

router.get("/:id",(req,res)=>{
    if(isNaN(req.params.id)) return res.status(404).send({error:-2})
    manager.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error:0,descripcion:err}))
})

router.post("/",(req,res)=>{
    if(!isAdmin) return res.send({error: -1, descripcion:`ruta ${req.baseUrl}${req.url} metodo ${req.method}`})
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo || req.body.foto || req.body.precio || req.body.stock){
        manager.createProduct(req.body)
            .then(result => res.send(result))
            .catch(err => res.send({error:0, descripcion: err}))
    }
})

router.put("/:id", (req,res)=>{
    if(!isAdmin) return res.send({error: -1, descripcion:`ruta ${req.baseUrl}${req.url} metodo ${req.method}`})
    if(isNaN(req.params.id)) return res.status(404).send({error:-2})
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo || req.body.foto || req.body.precio || req.body.stock){
        manager.updateById(req.params.id, req.body)
            .then(result => res.send(result))
            .catch(err => res.send({error:0, descripcion: err}))
    }
})

router.delete("/:id",(req,res)=>{
    if(!isAdmin) return res.send({error: -1, descripcion:`ruta ${req.baseUrl}${req.url} metodo ${req.method}`})
    if(isNaN(req.params.id)) return res.status(404).send({error:-2})
        manager.deleteById(req.params.id)
            .then(result => res.send(result))
            .catch(err => res.send({error:0, descripcion: err}))
})

export default router

