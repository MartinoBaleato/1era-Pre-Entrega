import fs from "fs"

const pathToFile = "./src/data/products.json"

class ProductManager{
    findAll = async()=>{
        if(!fs.existsSync(pathToFile)) return{error:0, description:"Error no existe"}
        let data = await fs.promises.readFile(pathToFile, "utf-8")
        return JSON.parse(data)
    }
    
    findById = async (id) =>{
        id = parseInt(id)
        if(!fs.existsSync(pathToFile)) return{error:0, description:"Error no existe"}
        let data = await fs.promises.readFile(pathToFile,"utf-8")
        let products = JSON.parse(data)
        let product = products.find(item=> item.id === id)
        if(!product) return {error:0, description:"product not found"}
        return product
    }
    
    createProduct = async(product)=>{
        try {
            let id = 1
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, "utf-8")
                let products = JSON.parse(data)
                if(products.length > 0) id = products[products.length-1].id+1
                product={
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
                }
                products.push(product)
                await fs.promises.writeFile(pathToFile, JSON.stringify(products,null,2))
            }else{
                product = {
                    id,
                    timestamp: new Date().toLocaleString(),
                    ...product
                }
                await fs.promises.writeFile(pathToFile, JSON.stringify(products,null,2))
            }
            return product
        } catch (error) {
            return {error: 0, description: "No se pudo acceder al archivo"}
        }
    }

    updateById = async (id,updateProduct)=>{
        id = parseInt(id)
        if(fs.existsSync(pathToFile)){
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.map(item =>{
                if(item.id === id){
                    isFound = true
                    return{
                        id,
                        ...updateProduct
                    }
                } else return item
            })
            if(!isFound) return {error:0, description:"product not found"}
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts,null,2))
            return newProducts.find(item => item.id === id)
        }else{
            return {error:0, description:"product not found"}
        }
    }
    deleteById = async (id) =>{
        id = parseInt(id)
        if(fs.existsSync(pathToFile)){
            let isFound = false
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.filter(item => item.id !== id)
            if(products.length !== newProducts.length) isFound = true
            if(!isFound) return{error:0, descripcion:"product not found"}
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts,null,2))
            return newProducts
        }else{
            return {error:0, description:"product not found"}
        }
    }
}

export default ProductManager