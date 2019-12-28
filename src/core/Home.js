import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link , Redirect} from 'react-router-dom';
import { getProductByCategory } from '../redux-store/actions/product';
import { getCategory } from '../redux-store/actions/admin';
import Card from '../core/Card';
import Footer from './footer';
const Home = () => {
    const [productsMen, setProductMen] = useState([]);
    const [productsWomen, setProductWomen] = useState([]);
    const [error, setError] = useState(false);
    //const [categories, setcategories] = useState([]);

    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                const categories = data;
                categories.map((ca,i)=>{
                    if(ca.name==='Men watch'){
                        loadProductMen(ca)
                    }else{
                        loadProductWomen(ca)
                    }
                })
            }
        })
    };
    const loadProductMen = (ca) => {
        getProductByCategory(ca._id).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductMen( response );
            }
        })
    }
    const loadProductWomen = (ca) => {
        getProductByCategory(ca._id).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductWomen( response );
            }
        })
    };
    useEffect(() => {
      loaddata();
    }, [])
    return (
        <Layout title='Home Page' description='App Node-React'>

            <div className= 'd-md-none d-flex text-center small'>
                <Link className='bg-light w-50 p-4 border font-weight-bold unlink'>
                    <span >SHOP NEW MENS</span>
                </Link>
                <Link className='bg-light w-50 p-4 border font-weight-bold unlink'>
                    <span >SHOP NEW WOMENS</span>
                </Link>
            </div>
            <div className='home-poster-men'>
            <div className='content'>
                    <div className= 'text-white'>BE A GENTLEMAN</div>
                        <Link>
                            <span className='button button-white button-circle px-5 font-weight-bold'>SHOP</span>
                        </Link>
                    </div>
            </div>
            <div className='row'>
                <div className='display-header col-6 col-md-3'>
                    New Arrivals
                </div>
                {productsMen.map((product, i) => (
                    <div className='col-md-3 col-6 mb-4' key={i}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <div className='home-poster-women'>
                    <div className='content'>
                    <div className= 'text-white'>TAKE YOU TIME</div>
                        <Link>
                            <span className='button button-white button-circle px-5 font-weight-bold'>SHOP</span>
                        </Link>
                    </div>
                </div>
            <div className='row'>
                <div className='display-header col-6 col-md-3'>
                    New Arrivals
                     </div>
                {productsWomen.map((product, i) => (
                    <div className='col-md-3 col-6 mb-4' key={i}>
                        <Card product={product} />
                    </div>

                ))}
            </div>
            <Footer />

        </Layout>
    )
}
export default Home;