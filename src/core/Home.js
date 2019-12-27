import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link , Redirect} from 'react-router-dom';
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
            <div className= 'd-md-none d-flex text-center small'>
                <span className='bg-light w-50 p-4 border font-weight-bold'>SHOP NEW MENS</span>
                <span className='bg-light w-50 p-4 border font-weight-bold'>SHOP NEW WOMENS</span>
            </div>
            <div className='home-poster-women'>
                    <div>Title</div>
                    <div>subtitle</div>
                    <Link>Shop</Link>
            </div>
            <div className='row'>
                <div className='display-header col-6 col-md-3'>
                    New Arrivals
                </div>
                {productsBysell.map((product, i) => (
                    <div className='col-md-3 col-6 mb-4' key={i}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <div className='home-poster-men'>
                    <div>Title</div>
                    <div>subtitle</div>
                    <Link>Shop</Link>
            </div>
            <div className='row'>
                <div className='display-header col-6 col-md-3'>
                    New Arrivals
                     </div>
                {productsByarrival.map((product, i) => (
                    <div className='col-md-3 col-6 mb-4' key={i}>
                        <Card product={product} />
                    </div>

                ))}
            </div>


        </Layout>
    )
}
export default Home;