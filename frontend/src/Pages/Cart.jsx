import React, { useContext, useState } from 'react'
import './CSS/Cart.css'
import cross_icon from '../Components/Assets/cart_cross_icon.png'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'



const Cart = () => {
    const navigate = useNavigate();
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems
    const [selectedItems, setSelectedItems] = useState([]);

    // Function for obtainig the new_price of a product
    // via looping each product to find one with matched product id with input id
    const getProductPrice = (id) => {
        for (let i = 0; i < all_product.length; i++) {
            if (id === all_product[i].id) {
                return all_product[i].new_price;
            }
        }
        return null
    };

    // Purpose: return the total quantity of product items selected
    // on each element in the selectedItems array, the return value of current total quantity plus quantity of this element is passed to the next element
    // finally return a single value of the accumulated calculated quantity
    const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
    // For obtaining the total price of product items selected
    // method similar to the previous one on totalQuantity
    const totalPrice = selectedItems.reduce((total, item) => total + (item.quantity * getProductPrice(item.productId)), 0);

    // Function for removing item, triggered by clicking the html image element (a "x" image)
    const handleRemoveItem = (event) => {
        let index = event.target.id;

        // obtain the product id to which the "x" image element belongs
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
    };

    // Function for adding the newly checked (selected) item into the array of selectedItems
    // as well as to removing the unchecked item from the selectedItems array
    const handleSelectedItem = (event) => {
        const selectedIndex = parseInt(event.target.id, 10);
        const selectedItem = cartItems[selectedIndex];

        // the value of event.target.checked here is already updated after clicking the checkbox
        if (event.target.checked) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedItem]);
        } else {
            setSelectedItems(prevSelectedItems =>
                prevSelectedItems.filter(item => item !== selectedItem)
            );
        }
    };

    //const goToCheckout = () => {
    //    <Link to='/checkout'><Checkout checkoutItems={selectedItems}></Checkout></Link>
    //};

    const goToCheckout = () => {
        if (selectedItems.length !== 0) { //Checking the selected Items are valid
            navigate('/checkout', { state: { items: selectedItems, totalQuantity: totalQuantity, totalPrice: totalPrice } })
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
                            <button onClick={goToCheckout}>Check Out</button>
                        </div>
                    </div>
                </div> :
                <div className="Not-login">
                    <h1>Seems like you haven't login, Let's login to see more</h1>
                </div>
            }
        </div>
    )
}

export default Cart
