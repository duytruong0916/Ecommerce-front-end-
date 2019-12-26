import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import Card from '../core/Card';
import Checkbox from '../core/Checkbox';
import Radiobox from '../core/Radiobox';
import { getCategory } from '../redux-store/actions/admin';
import { prices } from '../core/FixedPrice';
import { getFilteredProducts } from '../redux-store/actions/product';
const Shop = () => {
    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setlimit] = useState(6);
    const [skip, setskip] = useState(0);
    const [size, setsize] = useState(0);
    const [FilteredResults, setFilteredResults] = useState([]);
    const [myfilters, setFilter] = useState({
        filters: { category: [], price: [] }
    });

    const init = () => {
        getCategory().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategory(data);
            }
        })
    }
    const handleFilter = (filters, filterBy) => {
        const newfilters = { ...myfilters }
        newfilters.filters[filterBy] = filters;
        if (filterBy == 'price') {
            let pricevalues = handlePrice(filters);
            newfilters.filters[filterBy] = pricevalues;
        }
        loadFilterResults(newfilters.filters);
        setFilter(newfilters);

    }
    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }
    const loadFilterResults = (filters) => {
        //console.log(filters)
        getFilteredProducts(skip, limit, filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setsize(data.size);
                setskip(0);
            }
        });
    }
    const loadmore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myfilters.filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...FilteredResults,...data.data]);
                setsize(data.size);
                setskip(toSkip);
            }
        });
    }
    const loadmorebutton =()=>{
        return (
            size>0&&size>=limit &&(
                <button className ='btn btn-warining mb-4' onClick={loadmore}>Load more</button>
            )
        )
    }
    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myfilters.filters)
    }, [])
    return (
        <Layout title='Shop Page' description='Time to search and pick' className='container-fluid'>
            <div className='row'>
                <div className='col-3'>
                    <h2>Filter By Category</h2>
                    <ul>
                        <Checkbox categories={categories} handleFilter={(filter) => handleFilter(filter, 'category')} />
                    </ul>
                    <h2>Filter By Price Range</h2>
                    <ul>
                        <Radiobox prices={prices} handleFilter={(filter) => handleFilter(filter, 'price')} />
                    </ul>
                </div>
                <div className='col-9'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {FilteredResults.map((product, i) => (
                            <div className ='col-md-4 col-6 mb-3'>
                                 <Card key={i} product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadmorebutton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;