import express from "express";
import ProductManager from "../controllers/productManager.js";
import CartManager from "../controllers/cartManager.js";
const router = express.Router()

const carritoApi = new CartManager()
const productosApi = new ProductManager()

router.post('/', (req, res) => {
    res.send(carritoApi.create())
});

router.delete('/:id', (req, res) => {
    carritoApi.deleteCartById(req.params.id)
    res.send(carritoApi.getAll())
});

router.get('/:id/productos', (req, res) => {
    cart = carritoApi.getCartById(req.params.id)
    if(cart.productos){
        res.send(cart.productos)
    } else {
        res.send(cart)
    }
});

router.post('/:id/productos/:id_prod', (req, res) => {
    const cartId = req.params.id
    const prod = productosApi.getById(req.params.id_prod)
    if(prod.id){
        const prods = carritoApi.saveProd(prod, cartId)
        res.send(prods)
    } else {
        res.send(prod)
    } 
})

router.delete('/:id/productos/:id_prod', (req, res) => {
    const cartId = req.params.id
    const prodId = req.params.id_prod
    const prods = carritoApi.deleteProd(prodId, cartId)
    res.send(prods)
});

export default router