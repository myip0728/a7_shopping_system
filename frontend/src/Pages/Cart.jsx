import React, { useContext, useState } from 'react'
import './CSS/Cart.css'
import cross_icon from '../Components/Assets/cart_cross_icon.png'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'


const Cart = () => {
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const getProductPrice = (id) => {
        for (let i = 0; i < all_product.length; i++) {
            if (id === all_product[i].id) {
                return all_product[i].new_price;
            }
        }
        return null
    }

    const handleRemoveItem = (event) => {
        let index = event.target.id;
        removeitem(cartItems[index].productId, cartItems[index].option); // Setting the wanted product quantity to 0
    }

    const handleSelectedItem = (event) => {
        const checkbox = event.target;
        const index = checkbox.id;

        let id = cartItems[index].productId;
        let option = cartItems[index].option;
        let quantity = cartItems[index].quantity;
        let product_price = getProductPrice(cartItems[index].productId);

        if (checkbox.checked) {
            setSelectedItems(() => {
                let tmp = selectedItems;
                tmp.push({
                    selected_productId: id,
                    selected_option: option,
                    selected_quantity: quantity,
                    selected_price: product_price
                })
                return tmp;
            });
            setTotalQuantity(totalQuantity + quantity);
            setTotalPrice(totalPrice + product_price * quantity);
        } else {
            setSelectedItems(() => {
                let tmp = selectedItems;
                let tmp_element = {
                    selected_productId: id,
                    selected_option: option,
                    selected_quantity: quantity,
                    selected_price: product_price
                }
                tmp.splice(tmp.indexOf(tmp_element, 1));
                return tmp;
            });
            setTotalQuantity(totalQuantity - quantity);
            setTotalPrice(totalPrice - product_price * quantity)
        }
    }


    return (
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
                        <div className='cartitem-summary-total'>
                            <p>Total</p>
                            <p>$ {totalPrice}</p>
                        </div>
                    </div>
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
