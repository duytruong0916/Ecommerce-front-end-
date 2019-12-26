import React from 'react';
import { connect } from 'react-redux';
import Layout from '../core/Layout';
import { NavLink } from 'react-router-dom';
import EmailPasswordPage from '../user/EmailPassword'
const Signin = () => {
    return (
        <Layout title='Signin Page' description='App Node-React'>
            <div className='login_wrapper'>
                <div className="login_box">
                    <h1 className='login_title text-center font-weight-bold'>SHOES </h1>
                    <div className='text-center'>It's time to get new shoes</div>
                    <EmailPasswordPage />
                    <button className='button w-100 mt-4'>Login with Google</button>
                    <div className='text-center mt-4'><NavLink to="/signup" activeClassName="is-active">CREATE AN ACCOUNT</NavLink></div>
                </div>
            </div>
        </Layout>
    )
}


export default Signin;
