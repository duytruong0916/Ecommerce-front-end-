import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {Read, getRelatedProduct } from '../redux-store/actions/product';
import Card from '../core/Card';

const Product = (props) => {
    const [product, setproduct] = useState({});
    const [relatedproduct, setrelatedproduct] = useState([]);
    const [error, seterror] = useState(false);

    const loadSingleProduct = (productid) =>{
         Read(productid).then((data)=>{
            if(data.error){
                seterror(data.error);
            }else{
                setproduct(data);
                getRelatedProduct(data._id).then((response)=>{
                    console.log(response.error)
                    if(response.error){
                        seterror(response.error);
                    }
                    else{
                        setrelatedproduct(response);
                    }
                })
            }
         })
    }
    useEffect(()=>{
        const productid = props.match.params.productid;
        loadSingleProduct(productid);
    },[props])
    return (
        <Layout title= {product&&product.name} description={product&&product.description&&product.description.substring(0,100)}>
            <h2 className ='mb-4'>Single Product</h2>
            <div className='row'>
                <div className='col-8'>
                    {product&&product.description&&<Card product ={product} showviewbutton= {false}/>};
                </div>
                <div className ='col-4'>
                    <h4>Related Products</h4>
                    {relatedproduct.map((p,i)=>(
                        <div className='mb-3'  key={i}>
                            <Card product={p} showviewbutton = {false} showaddtocartbutton={false}/>
                        </div>
                    ))}
                </div>
              
            </div>
        </Layout>
    )
}

export default Product;