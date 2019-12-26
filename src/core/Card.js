import React,{ useState, useEffect } from 'react';
import { Link , Redirect} from 'react-router-dom';
import ShowImage from '../core/ShowImage';
import moment from  'moment';
import {addItem,  updateItem, removeItem} from '../core/CartHelper';
const Card = ({ product, showviewbutton = true, showaddtocartbutton =true, cartupdate =false, showremovebutton =false, run =undefined, setrun =f =>f}) => {
    const [redirect, setredirect] = useState(false);
    const [count, setcount] = useState(product.count);

    const handleChange = productid => (e) =>{
        setrun(!run)
        setcount(e.target.value <1 ? 1: e.target.count);
        if(e.target.value >=1){
            updateItem(productid,e.target.value);
        }
    }
    const ShowQuantity = (quantity) =>{
        return  quantity>0 ?
        ( <span className = 'badge badge-primary badge-pill'>In stock</span>):
        (<span className = 'badge badge-primary badge-pill'>Out of stock</span>)
    }
    const ShowViewButton = (showviewbutton) => {
        return (
            showviewbutton && (
                <Link to= {`/product/${product._id}`} className= 'mr-2'>
                      <button className='button button-blue mr-2 mb-2'>View product</button>
                </Link>
            )
        )
    }
    const addToCart = ()=>{
        addItem(product, ()=>{
            setredirect(true);
        });
    }
    const shouldRedirect = redirect =>{
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }
    const ShowCartbutton =( showaddtocartbutton)=>{
        return(
          showaddtocartbutton &&(<button className='button button-red mt-2 mb-2' onClick ={addToCart}>Add to cart</button>)
        )
    }
    const Showremovebutton =(removebutton)=>{
        return(
          removebutton &&(
          <button className='button button-red mt-2 mb-2' onClick ={()=>{ 
              setrun(!run)
              removeItem(product._id)}}>
             Remove item
            </button>)
        )
    }
    const Showcartupdatebutton = cartupdate =>{
        return(
            cartupdate&&(
                <div className ='input-group mb-3'>
                    <div className ='input-group-prepend '>
                        <span className ='input-group-text '>Adjust quantity</span>
                    </div>
                    <input type ='number' className='form-control' value={count} onChange ={handleChange(product._id)} />
                </div>
            )
        )
    }
    return (
        <div className='card'>
            <div className='card-header'>{product.name}</div>
            <div className='card-body'>
              
                <ShowImage product={product} url='product' />
                <p className='lead mt-2'>{product.description.substring(0, 10)}</p>
                <p className='mt-2'>${product.price}</p>
                <p>
                    Category: {product.category&&product.category.name}
                </p>
                <p>
                    Added on: {moment(product.createdAt).fromNow()}
                </p>
                {ShowQuantity(product.quantity)}
                <br />
                {ShowViewButton(showviewbutton)}
                {ShowCartbutton(showaddtocartbutton)}
                {Showremovebutton(showremovebutton)}
                {Showcartupdatebutton(cartupdate)}
            </div>
        </div>

    )
}

export default Card;