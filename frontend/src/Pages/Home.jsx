import React from 'react';
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewArrivals from '../Components/NewArrivals/NewArrivals'

export const Home = () => {
    return (
        <div>
            <Hero />
            <NewArrivals />
            <Popular category="headphone" />
            <Popular category="laptop" />
            <Popular category="mouse" />
            <Popular category="keyboard" />
        </div>
    )
}

export default Home