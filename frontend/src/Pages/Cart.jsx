import React, { useContext, useState, useEffect } from 'react'
import './CSS/Cart.css'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'


const Cart = () => {
    const { all_products } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeFromCart } = useContext(ShopContext); //Getting Shopping CartItems
    const [filteredCart, setFilteredCart] = useState([]); //Filter the array existing item


    useEffect(() => {
        const getProductPrice = (id) => {
            for (let i = 0; i < all_products.length; i++) {
                if (id === all_products[i].id) {
                    return all_products[i].new_price;
                } else { return null };
            }
        }


        const updateFilteredCart = () => {
            let tmp_cart = [];
            for (let id = 1; id < cartItems.length; id++) {
                // Loop through all products
                for (let opt = 0; opt < cartItems[id].length; opt++) {
                    // Loop through all options within a product
                    if (cartItems[id][opt].quantity !== 0) {
                        // Checking if the product is in the shopping cart
                        let tmp_element = {
                            selected_productId: id,
                            selected_option: cartItems[id][opt].option,
                            selected_quantity: cartItems[id][opt].quantity,
                            selected_price: getProductPrice(id)
                        };
                        tmp_cart.push(tmp_element);
                    }
                }
            }
            setFilteredCart(tmp_cart);
        };

        updateFilteredCart(); // Call the function to update filteredCart initially

        //Testing Data here
        setFilteredCart([{
            selected_productId: 1,
            selected_option: "Silver",
            selected_quantity: 20,
            selected_price: 3000
        }])
        console.log(filteredCart[0]);
    }, [cartItems, all_products, filteredCart]);



    return (
        <div className="cart-main">
            <h1>SHOPPING CART</h1>
            <div className='cart-left'>
                {filteredCart.map((item, index) => {
                    return (
                        <div>
                            <input type='checkbox' id={index}></input>
                            <CartItems key={index} productId={item.selected_productId} option={item.selected_option} quantity={item.selected_quantity} />
                        </div>
                    )
                })
                }
            </div>
            <div className='cart-right'>
                Total Testing
            </div>
        </div>
    )
}

export default Cart
