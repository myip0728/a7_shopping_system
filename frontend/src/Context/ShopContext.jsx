import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_product(data))

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
        console.log(cartItems);
    }, [])


    const addToCart = (Id, productOption, askedQuantity) => {
        //setCartItems(() => {
        //    let tmp = cartItems;
        //    if (tmp.length === 0) {
        //        tmp.push({ productId: Id, option: productOption, quantity: askedQuantity });
        //        return tmp;
        //    } else {
        //        for (let i = 0; i < tmp.length; i++) {
        //            if (tmp[i].productId === Id && tmp[i].option === productOption) {
        //                tmp[i].quantity += askedQuantity;
        //                return tmp;
        //            }
        //        }
        //        tmp.push({ productId: Id, option: productOption, quantity: askedQuantity });
        //        return tmp;
        //    }
        //})
        //console.log(cartItems);

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "productId": Id, "option": productOption, "quantity": askedQuantity }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const editCart = (Id, productOption, askedQuantity) => {
        //setCartItems((prevCartItems) => {
        //    let tmp = [...prevCartItems];
        //    if (tmp.length === 0) {
        //        return tmp;
        //    } else {
        //        for (let i = 0; i < tmp.length; i++) {
        //            if (tmp[i].productId === Id && tmp[i].option === productOption) {
        //                tmp[i].quantity = askedQuantity;
        //                return tmp;
        //            }
        //        }
        //        return tmp;
        //    }
        //})

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/editcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "productId": Id, "option": productOption, "quantity": askedQuantity }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const removeitem = (Id, productOption) => {
        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/removecartitem', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "productId": Id, "option": productOption }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    console.log(cartItems);

    const contextValue = { all_product, cartItems, addToCart, editCart, removeitem };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;