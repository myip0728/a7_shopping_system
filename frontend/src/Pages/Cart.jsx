import React, { useContext, useState } from 'react'
import './CSS/Cart.css'
import cross_icon from '../Components/Assets/cart_cross_icon.png'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'


const Cart = () => {
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems
    const [selectedItems, setSelectedItems] = useState([]);


    const getProductPrice = (id) => {
        for (let i = 0; i < all_product.length; i++) {
            if (id === all_product[i].id) {
                return all_product[i].new_price;
            }
        }
        return null
    }

    const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = selectedItems.reduce((total, item) => total + (item.quantity * getProductPrice(item.productId)), 0);

    const handleRemoveItem = (event) => {
        let index = event.target.id;

        const inputElement = document.getElementById(index);
        if (inputElement) {
            inputElement.checked = false;
        }
        //Handle the case when the product waiting to remove are in selected.
        const removedProduct = cartItems[index];
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.filter(item => item !== removedProduct)
        );
        removeitem(cartItems[index].productId, cartItems[index].option); // Setting the wanted product quantity to 0
    }

    const handleSelectedItem = (event) => {
        const selectedIndex = parseInt(event.target.id, 10);
        const selectedItem = cartItems[selectedIndex];

        if (event.target.checked) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem]);
        } else {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter(item => item !== selectedItem)
            );
        }
    };

    return (
        <div>
            {localStorage.getItem('token')
                ?
                <div className="cart-main">
                    <h1>SHOPPING CART</h1>
                    <div className="cart-container">
                        <div className='cart-left'>
                            {cartItems.map((item, index) => {
                                return (
                                    <div className='cartitem-list'>
                                        <input type='checkbox' id={index} onChange={handleSelectedItem}></input>
                                        <CartItems key={index} productId={item.productId} option={item.option} quantity={item.quantity} />
                                        <img className='cross-icon' src={cross_icon} alt="" id={index} onClick={handleRemoveItem} />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className='cart-right'>
                            <div className='cartitem-summary'>
                                <h1>Summary</h1>
                                <hr />
                                <div>
                                    <p>Quantity</p>
                                    <p>{totalQuantity} Items(s)</p>
                                </div>
                                <hr />
                                <div className='cartitem-summary-total'>
                                    <p>Total</p>
                                    <p>$ {totalPrice}</p>
                                </div>
                            </div>
                            <button>Check Out</button>
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

export default Cart
