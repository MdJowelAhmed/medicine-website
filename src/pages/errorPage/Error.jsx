
import React from 'react';
import error from '../../assets/error.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='min-h-screen max-w-7xl mx-auto'>
            <div className='flex justify-center'>
                <Lottie style={{ width: '500px' }} loop={true} animationData={error}></Lottie>
            </div>
            <div className=' mx-auto w-3/4 md:mt-10'>
                <Link to={'/'} className='btn btn-primary w-full'> Go Home </Link>
            </div>
        </div>
    );
};

export default Error;
