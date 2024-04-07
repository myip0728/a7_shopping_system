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
    }, [])


    const addToCart = (Id, productOption, askedQuantity) => {
        setCartItems(prevCartItems => {
            let updatedCartItems = [...prevCartItems]; // Create a new array based on the previous cartItems
            if (updatedCartItems.length === 0) {
                updatedCartItems.push({ productId: Id, option: productOption, quantity: askedQuantity });
            } else {
                let itemFound = false;
                for (let i = 0; i < updatedCartItems.length; i++) {
                    if (updatedCartItems[i].productId === Id && updatedCartItems[i].option === productOption) {
                        updatedCartItems[i].quantity += askedQuantity;
                        itemFound = true;
                        break;
                    }
                }
                if (!itemFound) {
                    updatedCartItems.push({ productId: Id, option: productOption, quantity: askedQuantity });
                }
            }
            return updatedCartItems;
        });

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
                .then((response) => console.log(response))
        }
    }

    const editCart = (Id, productOption, askedQuantity) => {
        setCartItems(prevCartItems => {
            let updatedCartItems = [...prevCartItems]; // Create a new array based on the previous cartItems

            if (updatedCartItems.length === 0) {
                updatedCartItems.push({ productId: Id, option: productOption, quantity: askedQuantity });
            } else {
                let itemFound = false;
                for (let i = 0; i < updatedCartItems.length; i++) {
                    if (updatedCartItems[i].productId === Id && updatedCartItems[i].option === productOption) {
                        updatedCartItems[i].quantity = askedQuantity;
                        itemFound = true;
                        break;
                    }
                }
                if (!itemFound) {
                    updatedCartItems.push({ productId: Id, option: productOption, quantity: askedQuantity });
                }
            }
            return updatedCartItems;
        });

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
                .then((response) => console.log(response))
        }
    }

    const removeitem = (Id, productOption) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = prevCartItems.filter(item => item.productId !== Id || item.option !== productOption);
            return updatedCartItems;
        });

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
                .then((response) => console.log(response))
        }
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            totalItem += cartItems[item].quantity
        }
        return totalItem;
    }

    console.log(cartItems);

    const contextValue = { all_product, cartItems, addToCart, editCart, removeitem, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;