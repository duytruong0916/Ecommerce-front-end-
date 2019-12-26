import React from 'react';
import Layout from '../core/Layout';
import SignUpForm from './SignUpForm'
import { NavLink } from 'react-router-dom';
const Signup = () => {
    return (
        <Layout title='Signup Page' description='App Node-React'>
            <div className='login_wrapper'>
                <div className="login_box">
                    <h1 className='login_title text-center font-weight-bold'>Register</h1>
                    <SignUpForm  />
                </div>
            </div>
        </Layout>
    )
}
export default Signup;