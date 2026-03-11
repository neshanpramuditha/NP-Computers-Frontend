export function getCart(){
    const cartString = localStorage.getItem("cart")
    
    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []

    }else{
        const cart = JSON.parse(cartString) //Convert String or Json to Array
        return cart
    }
}
// Example structure of cart
// const sampleCart = [
//     {
//         product:{
//             productID:"123",
//             name : "Product 1",
//             labelledprice : 1000,
//             price : 1500,
//             image: "http//product1.jpg",
//         },
//         quantity : 2
//     },
//     {.................},
//     {.................}
// ]

export function addToCart(product, qty){
    
    const cart = getCart();
    const existingProductIndex = cart.findIndex( // Return product index
        (item)=>{
            return item.product.productID == product.productID
        });

        //When it can't find anyone(ID), It should add item manually to the cart
        if (existingProductIndex == -1){

            //If the quantity is minus number program stoped
            if(qty<=0){
                console.error("Quantity must be greater than 0");
                return
            }

            cart.push(
                {
                    product:{
                        productID : product.productID,
                        name : product.name,
                        labelledPrice : product.labelledPrice,
                        price : product.price,
                        image : product.images[0]
                    },
                    qty : qty
                })
        }
        //දැනටමත් product එක cart එකේ තියෙනව නම්
        else{
            const newQty = cart[existingProductIndex].qty + qty

            if(newQty<=0){
                //Remove product from the cart
                cart.splice(existingProductIndex, 1)
            }else{
                cart[existingProductIndex].qty = newQty
            }
        }
        // Convert array to string using "JSON.stringify"
        const cartString = JSON.stringify(cart)
        localStorage.setItem("cart", cartString)
}