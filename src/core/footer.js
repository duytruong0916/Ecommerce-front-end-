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
                        <Link to='/signup'><button className='button w-100 ml-md-5 mt-5' >JOIN US</button></Link>
                    </div>
                    <div className='text-center'>
                        <span><a className="fa fa-facebook mt-5 pr-4" href="#"></a></span>
                        <span><a className="fa fa-twitter mt-5 pr-2" href="#"></a></span>
                        <span> <a className="fa fa-instagram mt-5 pl-2" href="#"></a></span>
                        <span> <a className="fa fa-youtube  mt-5 pl-4" href="#"></a></span>
                    </div>
                    <div className='w-100 ml-md-5 mt-5 text-center'>support@timefoxwatches.com</div>
                </div>
                <div className='second-col col-md-8 col-12' >
                    <div>
                        <div className='text-danger footer-subtile'>SHOP</div>
                        <div>
                            <div className='p-2'><Link to='/men' className='unlink-text'>Mens</Link></div>
                            <div className='p-2'><Link to='/women' className='unlink-text'>Womens</Link></div>
                            <div className='p-2'><Link to='/shop' className='unlink-text'>All Products</Link></div>
                        </div>
                    </div>
                    <div>
                        <div  className='text-danger footer-subtile'>DISCOVER</div>
                        <div >
                             <div className='p-2'><Link to='/' className='unlink-text'>About</Link></div>
                            <div className='p-2'><Link to='/' className='unlink-text'>Stories</Link></div>
                        </div>
                    </div>
                    <div>
                        <div  className='text-danger footer-subtile'>HELP</div>
                        <div >
                            <div className='p-2'><Link to='/' className='unlink-text'>FAQs</Link></div>
                            <div className='p-2'><Link to='/' className='unlink-text'>Contact</Link></div>
                        </div>
                    </div>

                </div>
                <div className='toggle col-md-8 col-12' >
                    <div className="text-danger text-center">
                        <div className="footer-toggle p-3" data-toggle="collapse" data-target="#shop" >SHOP</div>
                        <div className="collapse footer-collapse" id="shop">
                            <div className='p-2'><Link to='/men' className='unlink-text'>Mens</Link></div>
                            <div className='p-2'><Link to='/women' className='unlink-text'>Womens</Link></div>
                            <div className='p-2'><Link to='/shop' className='unlink-text'>All Products</Link></div>
                        </div>
                    </div>
                    <div className="text-danger text-center">
                        <div className="footer-toggle p-3" data-toggle="collapse" data-target="#discover">DISCOVER</div>
                        <div className="collapse footer-collapse" id="discover">
                            <div className='p-2'><Link to='/' className='unlink-text'>About</Link></div>
                            <div className='p-2'><Link to='/' className='unlink-text'>Stories</Link></div>
                        </div>
                    </div>
                    <div className="text-danger text-center">
                        <div className="footer-toggle p-3 " data-toggle="collapse" data-target="#help">HELP</div>
                        <div className="collapse footer-collapse" id="help">
                            <div className='p-2'><Link to='/' className='unlink-text'>FAQs</Link></div>
                            <div className='p-2'><Link to='/' className='unlink-text'>Contact</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4 footer-policy'>
                <span>
                    <span><Link to='/' className='unlink-text'>Terms & Conditions</Link></span>
                    <span><Link to='' className='unlink-text'> | Privacy Policy | </Link></span>
                </span>
                <span> <Link to='/' className='unlink-text'>© 2019-2020 TimeFox Watches</Link></span>
            </div>

        </div>

    )
}
export default Footer;