import React from 'react'
import './CartItems.css'

const CartItems = () => {
    const {all_products, cartItems, removeFromCart} = useContext(ShopContext);
  return (
    <div className = 'cartitems'>
    </div>
  )
};

export default CartItems
