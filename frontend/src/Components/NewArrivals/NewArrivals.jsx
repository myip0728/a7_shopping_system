import React, { useContext, useState, useEffect } from 'react'
import './NewArrivals.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'



const NewArrivals = (props) => {
    const { all_product } = useContext(ShopContext); //Using Context to receive the product data
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        let sortedProducts = [...all_product];
        sortedProducts.sort((a, b) => new Date(b.update_time) - new Date(a.update_time));
        setFilteredProducts(sortedProducts.slice(0, 4));
    }, [all_product]);

    return (
        <div className='new-arrivals'>
            <div className='new-arrivals-heading'>
                <h1>NEW ARRIVALS</h1>
            </div>
            <div className="new-arrivals-item">
                {filteredProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div >

    )
}

export default NewArrivals