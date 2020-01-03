import React from 'react';
const Carousel = () => (
    <div className="carousel slide" data-ride="carousel" data-interval="2000">
        <div className="carousel-inner">
            <div className="carousel-item active mt-3">
                <div >YEAR END SALE *EXTENDED*</div>
                <span className='mr-2 text-dark font-weight-bold'>15% OFF ALL ORDER |</span>
                <span className='mr-2 text-dark font-weight-bold'>20% OFF ORDERS $200+</span>
            </div>
            <div className="carousel-item mt-4 ">
                <div>FREE SHIPPING ALL ORDERS</div>
            </div>
        </div>
    </div>
)
export default Carousel;