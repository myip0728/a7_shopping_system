import React, { useContext, useState } from 'react'
import './CSS/Checkout.css'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
//import Cart from './Cart.jsx'


const Checkout = () => {
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems

    const updateDelivery = () => { };

    return (
        <div>
            {localStorage.getItem('token')
                ?
                <div className="checkout-main">
                    <h1>CHECKOUT</h1>
                    <div className="checkout-container">
                        <div className='checkout-left'>
                            <div className='delivery'>
                                <div className='delivery_info'>
                                    <h3>Delivery information</h3>
                                    <p>Address: { }</p>
                                    <p>District: { }</p>
                                    <p>Recipient: { }</p>
                                    <p>Mobile no.: { }</p>
                                    <p>Email address: { }</p>
                                </div>
                                <div className='update_delivery_info'>
                                    <button onClick={updateDelivery}>Update Address</button>
                                </div>
                            </div>
                            <div className='product_summary'>

                                <h3>Product information</h3>
                                <h4>Subtotal price: HKD { }</h4>
                                <div className='checkout-product'>
                                    { }
                                </div>

                            </div>
                        </div>
                        <div className='checkout-right'>
                            ...
                        </div>
                    </div>
                </div> :
                <div className="cart-main-not-login">
                    <h1>Seems like you haven't login, Let's login to see more</h1>
                </div>
            }
        </div>
    )
}

export default Checkout
