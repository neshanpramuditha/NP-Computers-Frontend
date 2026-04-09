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

// Function for displaing total products price in the cart
export function getCartTotal(cart){
    let total = 0

    cart.forEach( 
        (cartItem)=>{
            total += cartItem.product.price * cartItem.qty
        }
    )
    return total
}
