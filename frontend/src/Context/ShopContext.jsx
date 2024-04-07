import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => { //This function is for generating default cart for frontend development
    //This function can be used to create shopping cart data for new user in backend
    let cart = [];
    const len = all_product.length;
    for (let i = 1; i < len; i++) {
        if (all_product[i - 1].option.length > 0) {
            let tmp1 = [];
            for (let j = 0; j < all_product[i - 1].option.length; j++) {
                let tmp2 = {
                    option: null,
                    quantity: 0
                };
                tmp2.option = all_product[i - 1].option[j];
                tmp1.push(tmp2);
            }
            cart[i] = tmp1;
        } else {
            cart.push(
                [{
                    option: null,
                    quantity: 0
                }])
        }
    }
    if (all_product[len - 1].option.length > 0) {

        let tmp1 = [];
        for (let j = 0; j < all_product[len - 1].option.length; j++) {
            let tmp2 = {
                option: null,
                quantity: 0
            };
            tmp2.option = all_product[len - 1].option[j];
            tmp1.push(tmp2);
        }
        cart.push(tmp1);
    } else {
        cart.push(
            [{
                option: null,
                quantity: 0
            }])
    }
    cart[1][1].quantity = 9;
    return cart;
};

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, [])

    const addToCart = (productId, productOption, askedQuantity) => {
        setCartItems(() => {
            let tmp = cartItems;
            for (let i = 0; i < tmp[productId].length; i++) {
                if (tmp[productId][i].option === productOption) {
                    tmp[productId][i].quantity += askedQuantity;
                }
            }
            return tmp;
        })
        console.log(cartItems);
        //The below code are commented for the sake of frontend development, will be decommented when frontend development ends
        //if (localStorage.getItem('token')) {
        //    fetch('http://localhost:4000/addtocart', {
        //        method: 'POST',
        //        headers: {
        //            Accept: 'application/form-data',
        //            'token': `${localStorage.getItem('token')}`,
        //            'Content-Type': 'application/json',
        //        },
        //        body: JSON.stringify({ "itemId": itemId }),
        //    })
        //        .then((response) => response.json())
        //        .then((data) => console.log(data));
        //}
    }

    const editCart = (productId, productOption, productQuantity) => {
        setCartItems(() => {
            let tmp = cartItems;
            for (let i = 0; i < tmp[productId].length; i++) {
                if (tmp[productId][i].option === productOption) {
                    tmp[productId][i].quantity = productQuantity;
                }
            }
            return tmp;
        })

        //The below code are commented for the sake of frontend development, will be decommented when frontend development ends
        //if (localStorage.getItem('token')) {
        //    fetch('http://localhost:4000/removefromcart', {
        //        method: 'POST',
        //        headers: {
        //            Accept: 'application/form-data',
        //            'token': `${localStorage.getItem('token')}`,
        //            'Content-Type': 'application/json',
        //        },
        //        body: JSON.stringify({ "itemId": itemId }),
        //    })
        //        .then((response) => response.json())
        //        .then((data) => console.log(data));
        //}
    }

    console.log(cartItems);

    const contextValue = { all_product, cartItems, addToCart, editCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;