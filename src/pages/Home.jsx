import React from 'react';
import CategoriesSection from '../components/categoryCard/CategoriesSection';
import DiscountProducts from '../components/DiscountProducts/DiscountProducts';
import HealthTips from '../components/healthTips/HealthTips';
import FeaturedVendors from '../components/featuredVendors/FeaturedVendors';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <CategoriesSection></CategoriesSection>
            <DiscountProducts></DiscountProducts>            
            <FeaturedVendors></FeaturedVendors>
            <HealthTips></HealthTips>

        </div>
    );
};

export default Home;