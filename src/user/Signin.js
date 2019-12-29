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
                    <span className='page-header-title'>LOG INTO TimeFox </span>
                    <div className='text-center'>It's time to manage your account</div>
                    <EmailPasswordPage />
                    <button className='button w-100 mt-4'>Login with Google</button>
                    <div className='text-center mt-4 new-link-color small' >New to TimeFox? <NavLink to="/signup">CREATE AN ACCOUNT</NavLink></div>
                </div>
            </div>
        </Layout>
    )
}


export default Signin;
