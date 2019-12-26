import React, { useState, useEffect } from 'react';
import { getCategory } from '../redux-store/actions/admin';
import { List } from '../redux-store/actions/product';
import Card from '../core/Card';

const Search = () => {
    const [data, setdata] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });
    const { categories, category, search, searched, results } = data;
    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setdata({ ...data, categories: data })
            }
        })
    };
    useEffect(() => {
        loaddata();
    }, [])
    const handleChange = name => (e) => {
        setdata({ ...data, [name]: e.target.value, searched: false });
    }
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className = 'mt-4 mb-4'>
                     {searchMessage(searched, results)}
                </h2>
                <div className='row'>
                    {results.map((product, i) => (
                        <Card product={product} key={i} />
                    ))}
                </div>
            </div>
        )
    }
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }
    const searchMessage = (searched, results)=>{
        if(searched && results.length >0){
            return `Found ${results.length} products`
        }
        if(searched && results.length <1){
            return `No products founds`
        }
    }
    const searchData = () => {
        //console.log(search,category)
        List({ search: search || undefined, category: category }).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setdata({ ...data, results: response, searched: true })
            }
        })
    }
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className='input-group-text'>
                <div className='input-group input-group-lg'>
                    <div className='input-group-prepend'>
                        <select className='btn mr-2' onChange={handleChange('category')}>
                            <option value='All'>Pick category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type='search'
                        className='form-control'
                        placeholder='Search by name'
                        onChange={handleChange('search')} />
                </div>
                <div className='btn input-group-append'>
                    <button className='button'>Search</button>
                </div>
            </span>
        </form>
    )
    return (
        <div className='row'>
            <div className='container mb-3'>
                {searchForm()}
            </div>
            <div className='container-fluid mb-3'>
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;