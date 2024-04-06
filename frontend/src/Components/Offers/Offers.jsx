import React, { useContext, useEffect, useState } from 'react'
import './Offers.css'
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';

const Offers = () => {
    const { all_product } = useContext(ShopContext);
    const [bestSellerId, setBestSellerId] = useState(-1);
    const [bestSellerName, setBestSellerName] = useState("");
    const [bestSellerImages, setBestSellerImages] = useState([]);
    const [bestSellerNewPrice, setBestSellerNewPrice] = useState(-1);
    const [bestSellerOldPrice, setBestSellerOldPrice] = useState(-1);

    useEffect(() => {
        if (all_product.length > 0) {
            const productWithMaxOrders = all_product.reduce((maxProduct, product) => {//For finding the product with the max no_order
                if (product.no_order > maxProduct.no_order) {
                    return product;
                }
                return maxProduct;
            });

            // Set the best seller based on the product with max orders
            setBestSellerId(productWithMaxOrders.id);
            setBestSellerName(productWithMaxOrders.name);
            setBestSellerImages(productWithMaxOrders.images);
            setBestSellerNewPrice(productWithMaxOrders.new_price);
            setBestSellerOldPrice(productWithMaxOrders.old_price);
        }
    }, [all_product]);

    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For you</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <Link to={`/product/${bestSellerId}`}><button>Check Now</button></Link>
            </div>
            <div className="offers-right">
                <Item key={1} id={bestSellerId} name={bestSellerName} images={bestSellerImages} new_price={bestSellerNewPrice} old_price={bestSellerOldPrice} />
            </div>
        </div>
    )
}

export default Offers