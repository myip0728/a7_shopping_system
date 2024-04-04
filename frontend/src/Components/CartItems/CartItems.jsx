import React from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {
    const {all_products, cartItems, removeFromCart} = useContext(ShopContext);
  return (
    <div className = 'cartitems'>
        {all_products.map((e) => {
            if (cartItems[e.id] > 0) {
                return (
                    <div className = 'cartitems-format'>
                        <></>
                    </div>
                )
            }
        })}
    </div>
  )
};

export default CartItems
