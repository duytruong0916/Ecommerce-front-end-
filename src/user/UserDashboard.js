import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from '../redux-store/actions/user';
import moment from 'moment';
const UserDashboard = (props) => {
    const [purchasehistoy, setpurchasehistory] = useState([]);
    const { _id, name, email, role } = props.userinfor.user;
    const loadPurchaseHistory = (userid, token) => {
        getPurchaseHistory(userid, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpurchasehistory(data);
            }
        })
    }
    const userLink = () => {
        return (
            <div className='card mb-3'>
                <h3 className='card-header'>User Link</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/cart'>My Cart</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to={`/profile/${_id}`}>Edit Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userInfo = () => {
        return (
            <div className='card mb-5 container'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 1 ? 'Admin' : 'User'}</li>
                </ul>
            </div>
        )
    }
    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {purchasehistoy.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h5>Product name: {p.name}</h5>
                                                <h5>Product price: ${p.price}</h5>
                                                <h5>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h5>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    useEffect(() => {
        loadPurchaseHistory(props.userinfor.user._id, props.userinfor.token);
    }, [])
    return (
        <Layout title='UserDashbard' description={`Hello ${name}`} className='containrt-fluid'>
            <div className='row'>
                <div className='col-md-4 '>
                    {userLink()}
                </div>
                <div className='col-md-8'>
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    )
}


const MapStateToProps = (state) => ({
    islogin: !!state.auth.user,
    userinfor: state.auth.user,
})
export default connect(MapStateToProps)(UserDashboard);