import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { getCart } from '../redux-store/actions/cart';
import Card from '../core/Card';
import { Link } from 'react-router-dom';
import Checkout from '../core/Checkout';
const Cart = (props) => {
    const [item, setitem] = useState([]);
    const [run, setrun] = useState(false);
    const {cartClick} = props;
    const handleClick = ()=>{
        cartClick();
    }
    const getTotal = () => {
        return item.reduce((currentvalue, nextvalue) => {
            return currentvalue + nextvalue.count * nextvalue.price;
        }, 0)
    }
    const ShowItem = () => {
        return (
            <div>
                <div className ='font-weight-bold p-5'>Your cart has {`${item.length}`} items</div>
                <hr />
                <div className='row'>
                    {item.map((p, i) => (
                        <div className='col-6' key={i}>
                            <Card product={p} showaddtocartbutton={false} showQuantity={false} showviewbutton={false} cartupdate={true} showremovebutton={true} run={run} setrun={setrun} />
                        </div>

                    ))}
                </div>
            </div>
        )
    }
    const NoItemMessage = () => {
        return (
            <div>
                <div className ='font-weight-bold p-5'>Your cart is empty!</div>
                <hr />
                <div className='row'>
                    <div className='col-12 mt-5' onClick = {handleClick}>
                        <Link to ='/men'><button className ='button-card w-50'>SHOP MEN</button></Link>
                    </div>
                    <div className='col-12 mt-5 mb-5' onClick = {handleClick}>
                      <Link to ='/women'><button className ='button-card w-50'>SHOP MEN</button></Link>
                    </div>
                </div>
            </div>
        )
    }
    useEffect(() => {
        setitem(getCart());
    }, [run, props])

    return (
        <Layout title='Shopping cart' description='Manage you cart items' className='container-fluid'>
            <div className = 'card-item-shower'>
                {item.length > 0 ? ShowItem(item) : NoItemMessage()}
            </div>
            <div className = 'mt-5'>
                 {item.length > 0 &&(
                 <div className='border'>
                     <div>
                         <span>Subtotal:</span> 
                         <span className='font-weight-bold'> ${getTotal()}</span>
                    </div>
                     <div>
                         <span>Shipping: </span>
                         <span className='font-weight-bold'>FREE</span>
                    </div>
                     <button className = 'button-card mt-2'>CHECK OUT</button>
                 </div>)}
            </div>
        </Layout>
    )
}
export default Cart;