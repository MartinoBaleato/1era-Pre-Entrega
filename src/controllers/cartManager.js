import fs from "fs"

const pathToFile = "./src/data/carts.json"

class CartManager{
    createCart = async (cart) =>{
        try {
            let id = 1
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let carts = JSON.parse(data)
                if(carts.length > 0) id = carts[carts.length-1].id+1
                cart = {
                    id,
                    timeStamp: new Date().toLocaleString(),
                    ...cart
                }
                carts.push(cart)
                await fs.promises.writeFile(pathToFile,JSON.stringify(carts,null,2))
            }else{
                cart = {
                    id,
                    timeStamp: new Date().toLocaleString(),
                    ...cart
                }
                await fs.promises.writeFile(pathToFile,JSON.stringify([cart],null,2))
            }
            return cart
        } catch (error) {
            return {error:0, descripcion:"No se puede acceder a la base de datos"}
        }
    }
    deleteCart = async(id)=>{
        id = parseInt(id)
        if(fs.existsSync(pathToFile)){
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let carts = JSON.parse(data)
            let newCarts = carts.filter(item => item.id !== id)
            if(carts.length !== newCarts.length) isFound = true
            if(!isFound) return {error:0, descripcion:"Cart not found"}
            await fs.promises.writeFile(pathToFile,JSON.stringify(newCarts,null,2))
            return newCarts
        }else{
            return {error:0, descripcion:"No existe la base de datos"}
        }
    }
    findById = async (id) =>{
        id = parseInt(id)
        if(!fs.existsSync(pathToFile)) return{error:0, description:"Error no existe"}
        let data = await fs.promises.readFile(pathToFile,"utf-8")
        let carts = JSON.parse(data)
        let cart = carts.find(item=> item.id === id)
        if(!cart) return {error:0, description:"cart not found"}
        return cart
    }
    getAll() {
        try{
            const carts = fs.readFileSync(this.ruta, 'utf-8')
            return JSON.parse(carts) 
        } 
        catch (err) {
            return [err]
        }
    }
    saveProd(elem,id){
        const carts = this.getAll()
        const index = carts.findIndex(c => c.id == id)
        if(index !== -1){
            carts[index].productos.push(elem)
            fs.writeFileSync(this.ruta, JSON.stringify(carts,null,2))
            return carts[index].productos
        }else{
            return{error: "carrito no encontrado"}
        }
    }
    deleteProd(prodId, cartId) {
        const carts = this.getAll()
        const cartIndex = carts.findIndex(c => c.id == cartId)

        if (cartIndex !== -1) {

            const prodIndex = carts[cartIndex].productos.findIndex(p => p.id == prodId)

            if (prodIndex !== -1){

                carts[cartIndex].productos.splice(prodIndex, 1)
                fs.writeFileSync(this.ruta, JSON.stringify(carts, null, 2))
                return carts[cartIndex].productos
            } else {
                return { error: `elemento no encontrado` }
            }
        } else {
            return { error: `carrito no encontrado` }
        }
    }
}

export default CartManager