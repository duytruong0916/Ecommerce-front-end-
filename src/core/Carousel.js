import React from 'react';
import { Link } from 'react-router-dom';
const Carousel = () => (
    <div className="carousel slide" data-ride="carousel" data-interval="2000">
        <div className="carousel-inner">
            <div className="carousel-item active mt-4 ">
                <div>FREE SHIPPING ALL ORDERS <span className='ml-2'><Link to='signup'>Sign up now!</Link></span></div>
            </div>
            <div className="carousel-item mt-3">
                <div >YEAR END SALE *EXTENDED*</div>
                <span className='mr-2 text-dark font-weight-bold'>15% OFF ALL ORDER |</span>
                <span className='mr-2 text-dark font-weight-bold'>20% OFF ORDERS $200+</span>
            </div>
        </div>
    </div>
)
export default Carousel;