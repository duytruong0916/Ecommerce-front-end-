import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer-wrapper'>
            <div className='row'>
                <div className='col-md-4 col-12 p-5'>
                    <div className='w-100 mt-3 profile_name text-center'>TIMEFOX</div>
                    <div className='w-md-75 ml-md-5 mt-3'>For happy hour sales, new product releases & behind the scenes access.</div>
                    <div className='text-center' >
                        <Link to ='/signup'><button className='button w-100 ml-md-5 mt-5' >JOIN US</button></Link>
                    </div>
                    <div className='text-center'>
                        <span><a className="fa fa-facebook mt-5 pr-4" href="#"></a></span>
                        <span><a className="fa fa-twitter mt-5 pr-2" href="#"></a></span>
                        <span> <a className="fa fa-instagram mt-5 pl-2" href="#"></a></span>
                        <span> <a className="fa fa-youtube  mt-5 pl-4" href="#"></a></span>
                    </div>
                    <div className='w-100 ml-md-5 mt-5 text-center'>support@timefoxwatches.com</div>
                </div>
                <div className='col-md-8 col-12'>

                </div>
            </div>
            <div className='p-4 footer-policy'>
                 <span>
                     <span><Link to ='/'className='unlink-text'>Terms & Conditions</Link></span>
                     <span><Link to='' className='unlink-text'> | Privacy Policy | </Link></span>
                </span> 
                 <span> <Link to='/' className='unlink-text'>© 2019-2020 TimeFox Watches</Link></span>
            </div>

        </div>

    )
}
export default Footer;