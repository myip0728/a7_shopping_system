import React, { useContext, useState, useEffect } from 'react'
import './CSS/Cart.css'
import cross_icon from '../Components/Assets/cart_cross_icon.png'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'


const Cart = () => {
    const { all_product } = useContext(ShopContext); //Getting all product details
    const { cartItems, editCart } = useContext(ShopContext); //Getting Shopping CartItems
    const [filteredCart, setFilteredCart] = useState([]); //Filter the array existing item
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const getProductPrice = (id) => {
            for (let i = 0; i < all_product.length; i++) {
                if (id === all_product[i].id) {
                    return all_product[i].new_price;
                }
            }
            return null
        }


        const updateFilteredCart = () => {
            let tmp_cart = [];
            for (let id = 1; id < cartItems.length; id++) {
                // Loop through all products
                for (let opt = 0; opt < cartItems[id].length; opt++) {
                    // Loop through all options within a product
                    if (cartItems[id][opt].quantity !== 0) {
                        // Checking if the product is in the shopping cart
                        let price = getProductPrice(id);
                        let tmp_element = {
                            selected_productId: id,
                            selected_option: cartItems[id][opt].option,
                            selected_quantity: cartItems[id][opt].quantity,
                            selected_price: price
                        };
                        tmp_cart.push(tmp_element);
                    }
                }
            }
            setFilteredCart(tmp_cart);
            //Testing data here
            //setFilteredCart([{
            //    selected_productId: 1,
            //    selected_option: "Silver",
            //    selected_quantity: 10,
            //    selected_price: 3000
            //}, {
            //    selected_productId: 2,
            //    selected_option: "Silver",
            //    selected_quantity: 10,
            //    selected_price: 3000
            //}, {
            //    selected_productId: 3,
            //    selected_option: "Silver",
            //    selected_quantity: 10,
            //    selected_price: 3000
            //}, {
            //    selected_productId: 4,
            //    selected_option: "Silver",
            //    selected_quantity: 10,
            //    selected_price: 3000
            //}])
        };

        updateFilteredCart(); // Call the function to update filteredCart initially

        //Testing Data here
    }, [cartItems, all_product, filteredCart]);

    const handleRemoveItem = (event) => {
        let index = event.target.id;
        editCart(filteredCart[index].selected_productId, filteredCart[index].selected_option, 0); // Setting the wanted product quantity to 0
    }

    const handleSelectedItem = (event) => {
        const checkbox = event.target;
        const index = checkbox.id;

        if (checkbox.checked) {
            setTotalQuantity(totalQuantity + filteredCart[index].selected_quantity);
            setTotalPrice(totalPrice + filteredCart[index].selected_price * filteredCart[index].selected_quantity);
            setSelectedItems(() => {
                let tmp = selectedItems;
                tmp.push({
                    selected_productId: filteredCart[index].selected_productId,
                    selected_option: filteredCart[index].selected_option,
                    selected_quantity: filteredCart[index].selected_quantity,
                    selected_price: filteredCart[index].selected_price
                });
                return tmp;
            });
        } else {
            setTotalQuantity(totalQuantity - filteredCart[index].selected_quantity);
            setTotalPrice(totalPrice - filteredCart[index].selected_price * filteredCart[index].selected_quantity)
            setSelectedItems(() => {
                let tmp = selectedItems;
                let tmp_element = {
                    selected_productId: filteredCart[index].selected_productId,
                    selected_option: filteredCart[index].selected_option,
                    selected_quantity: filteredCart[index].selected_quantity,
                    selected_price: filteredCart[index].selected_price
                }
                tmp.splice(tmp.indexOf(tmp_element, 1));
                return tmp;
            });
        }
    }


    return (
        <div className="cart-main">
            <h1>SHOPPING CART</h1>
            <div className="cart-container">
                <div className='cart-left'>
                    {filteredCart.map((item, index) => {
                        return (
                            <div className='cartitem-list'>
                                <input type='checkbox' id={index} onChange={handleSelectedItem}></input>
                                <CartItems key={index} productId={item.selected_productId} option={item.selected_option} quantity={item.selected_quantity} />
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
