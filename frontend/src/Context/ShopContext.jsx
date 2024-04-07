import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);

    // Getting user data
    const [cartItems, setCartItems] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [history, setHistory] = useState([]);
    const [date, setDate] = useState("");
    const [address, setAddress] = useState({});
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState(null);


    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_product(data))

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/getuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((user) => {
                    setUsername(user.username);
                    setCartItems(user.cartData);
                    setEmail(user.email);
                    setPassword(user.password);
                    setHistory(user.history);
                    setDate(user.date);
                    setAddress(user.address);
                    setName(user.name);
                    setMobile(user.mobile);
                });
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

    const updateHistory = (Id) => {
        setHistory((prevHistory) => {
            const updatedHistory = [...prevHistory, Id];
            if (updatedHistory.length > 5) {
                updatedHistory.shift();
            }
            return updatedHistory;
        })

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/updateHistory', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "productId": Id }),
            })
                .then((response) => console.log(response))
        }
    }

    const updateAddress = (input_room, input_floor, input_building, input_area, input_district, input_city) => {
        const input_address = {
            room: input_room,
            floor: input_floor,
            building: input_building,
            area: input_area,
            district: input_district,
            city: input_city
        };

        setAddress(input_address);

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/updateAddress', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input_address),
            })
                .then((response) => console.log(response))
        }
    }

    const updateMobile = (input_mobile) => {
        setMobile(input_mobile);

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/updatemobile', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: input_mobile }),
            })
                .then((response) => console.log(response))
        }
    }

    const updateName = (input_name) => {
        setName(input_name);

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/updatename', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: input_name }),
            })
                .then((response) => console.log(response))
        }
    }

    const contextValue = { all_product, cartItems, username, email, password, history, date, name, mobile, address, addToCart, editCart, removeitem, getTotalCartItems, updateHistory, updateAddress, updateMobile, updateName };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;