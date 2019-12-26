export const addItem = (item,next)=>{
    let cart = [];
    if(typeof window !=='undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1
        })
        cart = Array.from(new Set(cart.map(p=> p._id))).map(id=>{
            return cart.find(p=>p._id ===id);
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}
export const itemTotal = ()=>{
    if(typeof window !=='undefined'){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}
export const getCart = ()=>{
    if(typeof window !=='undefined'){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}
export const updateItem = (productid, count)=>{
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i)=>{
            if(p._id ===productid){
                cart[i].count = count; 
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
export const removeItem= (productid, count)=>{
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((p,i)=>{
            if(p._id ===productid){
                cart.splice(cart[i],1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}
export const EmptyCart = (next)=>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('cart');
        next();
    }
}