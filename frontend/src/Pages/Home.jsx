import React from 'react';
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewArrivals from '../Components/NewArrivals/NewArrivals'
import Offers from '../Components/Offers/Offers';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

export const Home = () => {
    return (
        <div>
            <Hero />
            <NewArrivals />
            <Offers />
            <Popular category="headphone" />
            <Popular category="laptop" />
            <Popular category="mouse" />
            <Popular category="keyboard" />
            <NewsLetter />
        </div>
    )
}

export default Home