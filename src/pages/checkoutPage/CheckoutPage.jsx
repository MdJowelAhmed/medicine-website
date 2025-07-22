import React from 'react';
import { Link } from 'react-router';

const CheckoutPage = () => {
    return (
        <div>
            hello
            <Link to={'/invoice'} className='btn-primary btn'>Invioce</Link>
        </div>
    );
};

export default CheckoutPage;