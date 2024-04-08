import React, { useContext, useState } from 'react'
import './CSS/Checkout.css'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
import { Cart } from './Cart.jsx'


const Checkout = () => {
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems
    

    return (
        <div>
            {localStorage.getItem('token')
                ?
                <div className="checkout-main">
                    <h1>CHECKOUT</h1>
                    <div className="cart-container">
                      ...
                    </div>
                </div> :
                <div className="cart-main-not-login">
                    <h1>Seems like you haven't login, Let's login to see more</h1>
                </div>
            }
        </div>
    )
}

export default Cart
