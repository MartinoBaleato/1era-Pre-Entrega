import express from "express"
import productRouter from "./router/productRouter.js"
// import cartRouter from "./router/cartRouter.js"

const app = express()
const PORT =  process.env.PORT || 8080
const server = app.listen(PORT,()=> console.log("Server Up!"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productRouter)
// app.use("/api/carrito", cartRouter)