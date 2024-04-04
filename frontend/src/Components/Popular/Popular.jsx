import React, { useContext, useState, useEffect } from 'react'
import './Popular.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'



const Popular = (props) => {
    const { all_product } = useContext(ShopContext); //Using Context to receive the product data
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const updatedFilteredProducts = all_product.filter(
            (item) => item.category === props.category
        );
        let sortedProducts = [...updatedFilteredProducts];
        sortedProducts.sort((a, b) => b.rating - a.rating);
        setFilteredProducts(sortedProducts.slice(0, 4));
    }, [all_product, props.category]);

    return (
        <div className='popular'>
            <div className='popular-heading'>
                <h1>POPULAR IN {props.category.toUpperCase()}</h1>
                <a className='view-all' href={`/${props.category}`}>view all &gt;</a>
            </div>
            <div className="popular-item">
                {filteredProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div >

    )
}

export default Popular