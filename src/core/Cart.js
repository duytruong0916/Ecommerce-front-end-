import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {getCart} from '../core/CartHelper';
import Card from '../core/Card';
import { Link} from 'react-router-dom';
import Checkout from '../core/Checkout';
 const Cart =()=>{
    const [item, setitem] = useState([]);
    const [run, setrun] = useState(false);
    const ShowItem = ()=>{
        return(
            <div>
                <h2>Your cart has {`${item.length}`} items</h2>
                <hr />
                {item.map((p,i)=>(
                    <Card product={p} key={i} showaddtocartbutton ={false} cartupdate={true} showremovebutton ={true} run ={run} setrun={setrun}/>
                ))}
            </div>
        )
    }
    const NoItemMessage =()=>{
        return (
            <h2>No items<br /><Link to ='/shop'>Continue shopping</Link></h2>
        )
    }
    useEffect(()=>{
        setitem(getCart());
    },[run])
    
    return (
        <Layout title='Shopping cart' description='Manage you cart items' className='container-fluid'>
            <div className ='row'>
                <div className ='col-4'>
                    {item.length>0? ShowItem(item): NoItemMessage()}
                </div>
                <div className ='col-8'>
                    <h2>Your cart summary</h2>
                    <hr />
                    <Checkout products ={item} run ={run} setrun={setrun}/>
                </div>
            </div>
        </Layout>
    )
}
export default Cart;