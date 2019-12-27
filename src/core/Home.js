import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { getProduct } from '../redux-store/actions/product';
import Card from '../core/Card';
import Search from '../core/Search';
const Home = () => {
    const [productsBysell, setProductBysell] = useState([]);
    const [productsByarrival, setProductByarrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBysell = () => {
        getProduct('sold').then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductBysell(data)
            }
        })
    }
    const loadProductByarrival = () => {
        getProduct('createdAt').then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductByarrival(data)
            }
        })
    };
    useEffect(() => {
        loadProductByarrival();
        loadProductBysell();
    }, [])
    return (
        <Layout title='Home Page' description='App Node-React'>
            <Search />
            <h2>Best Sellers</h2>
            <div className='row'>
                {productsBysell.map((product, i) => (
                   <div className='col-md-4 col-6 mb-4' key={i}>
                   <Card  product={product} />
               </div>
                ))}
            </div>
            <h2>New Arrivals</h2>
            <div className='row'>
                {productsByarrival.map((product, i) => (
                    <div className='col-md-4 col-6 mb-4'  key={i}>
                        <Card product={product} />
                    </div>

                ))}
            </div>


        </Layout>
    )
}
export default Home;