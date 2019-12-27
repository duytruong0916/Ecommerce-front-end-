import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBraintreeClientToken, processPayment } from '../redux-store/actions/product';
import {createOrder} from '../redux-store/actions/order';
import {EmptyCart}  from '../redux-store/actions/cart';
import DropIn from 'braintree-web-drop-in-react'
const Checkout = ({EmptyCart, products, islogin, user,  run =undefined, setrun =f =>f}) => {
    const [data, setdata] = useState({
        loading:false,
        success:false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })
    const getToken =(userid,token)=>{
        getBraintreeClientToken(userid, token).then((response)=>{
            if(response.error){
                setdata({...data, error:response.error})
            }else{
                setdata({clientToken: response.clientToken})
            }
        })
    }
    const getTotal = () => {
        return products.reduce((currentvalue, nextvalue) => {
            return currentvalue + nextvalue.count * nextvalue.price;
        }, 0)
    }
    const ShowCheckout = () => (
            islogin ? (
                <div>{ShowDropIn()}</div>
            ) : (
                    <Link to='/signin'>Log in to check out</Link>
                )
    )
    let deliveraddress =data.address;
    const Pay =(e)=>{
        setdata({loading:true})
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        data.instance.requestPaymentMethod().then(data=>{
            //console.log(data);
            nonce = data.nonce;
            //console.log("send nonce and total to the process", nonce, getTotal(products))
            const paymentdata = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(user.user._id, user.token, paymentdata)
            .then((response)=>{
                    if(response.error){
                        setdata({loading:false, error: response.message? response.message: response.error})
            
                    }else{
                        //send order to the backend
                        console.log(response)
                        const orderdata = {
                            products: products,
                            trasaction_id: response.transaction.id,
                            amount: response.transaction.amount, 
                            address: deliveraddress
                        }
                        createOrder(user.user._id, user.token,orderdata).then(response =>{
                            //sent successfully and empty cart
                            EmptyCart()
                            console.log('Payment Success and empty cart')
                            setdata({loading:false, success:true});
                            run = true;
                            setrun(run);
                        }).catch(err=>{
                            console.log(err)
                        })
                     
                    };
            });
        }).catch(err =>{
            setdata({...data, error: err.message});
        });
    };
    const handleAddreschange = e =>{
         setdata({...data, address: e.target.value});
    }
    const ShowDropIn = ()=>(
        <div onBlur = {()=> setdata({...data, error: ''})}>
            {data.clientToken !==null&&products.length > 0 ? (
                <div>
                    <div className ='form-group mb-3'>
                        <label className='text-muted'>Delivery Address:</label>
                        <textarea 
                            onChange= {handleAddreschange}
                            value= {data.address}
                            placeholder ='Enter your delivery address...'
                            className ='form-control'/>
                    </div>
                    <DropIn 
                    options={{ authorization: data.clientToken ,paypal: {flow: 'vault'}}} 
                    onInstance= {instance => data.instance =instance}/>
                    <button className='button btn-success w-50' onClick={Pay}>Submit</button>
                </div>
            ):null}
        </div>
    )
    const ShowError = (error) =>(
        <div className ='alert alert-danger' style = {{display: error? '': 'none' }}>
            {error}
        </div>
    )
    const ShowMessage = (success) =>(
        <div className ='alert alert-success' style = {{display: success? '': 'none' }}>
            Thanks! Your payment was successful.
        </div>
    )
    const ShowLoading = (loading) =>(loading&&<h2>Loading.....</h2>)
    useEffect(()=>{
        if(user){
            getToken(user.user._id, user.token)
        }
       
    },[])
    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {ShowLoading(data.loading)}
            {ShowError(data.error)}
            {ShowMessage(data.success)}
            {ShowCheckout()}
        </div>

    )
}
const mapStatetoProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    EmptyCart: () => dispatch(EmptyCart())
});
export default connect(mapStatetoProps,mapDispatchToProps )(Checkout); 
