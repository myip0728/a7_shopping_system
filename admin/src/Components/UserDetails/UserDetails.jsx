import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './UserDetails.css'
import remove_icon from '../../assets/remove_icon.png'

const UserDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { user, edit } = location.state;
    const [updatedUser, setUpdatedUser] = useState({
        username: user.username,
        email: user.email,
        password: user.password,
        cartData: user.cartData,
        history: user.history,
        address: user.address,
        name: user.name,
        mobile: user.mobile,
        last_login: user.last_login,
        date: user.date
    })
    const [allproducts, setAllProduct] = useState([]);
    const [cart_details, setCartdetails] = useState([]);
    const [history_details, setHistorydetails] = useState([]);
    const [newCart, setNewCart] = useState(user.cartData)
    const [newHistory, setNewHistory] = useState(user.history);


    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            const data = await response.json();
            setAllProduct(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            // Handle error condition if needed
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const cartItems = [];
            const historyItems = [];

            for (let i = 0; i < user.cartData.length; i++) {
                const cartId = user.cartData[i].productId;
                const product = allproducts.find((item) => item.id === cartId);
                if (product) {
                    const cartItem = {
                        id: cartId,
                        image: product.images[0],
                        name: product.name,
                        option: user.cartData[i].option,
                        quantity: user.cartData[i].quantity,
                        price: product.new_price,
                    };
                    cartItems.push(cartItem);
                }
            }

            for (let i = 0; i < user.history.length; i++) {
                const hisId = user.history[i];
                const product = allproducts.find((item) => item.id === hisId);
                if (product) {
                    const historyItem = {
                        id: hisId,
                        image: product.images[0],
                        name: product.name,
                    };
                    historyItems.push(historyItem);
                }
            }

            setCartdetails(cartItems);
            setHistorydetails(historyItems);
        }
    }, [isLoading, allproducts, user.cartData, user.history]);

    const changeHandler = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
    }

    const changeAddressHandler = (e) => {
        const updatedUserCopy = { ...updatedUser };
        updatedUserCopy.address = { ...updatedUser.address, [e.target.name]: e.target.value };
        setUpdatedUser(updatedUserCopy);
    }

    const removeCartItem = (id, option) => {
        const updatedNewCart = newCart.filter(
            (item) => (item.productId !== id || item.option !== option)
        );
        const updatedCartDetails = cart_details.filter(
            (item) => (item.id !== id || item.option !== option)
        );

        setNewCart(updatedNewCart);
        setCartdetails(updatedCartDetails);
    }

    const removeHistory = (id) => {
        const updatedHistory = newHistory.filter(
            (item) => item !== id
        )
        const updatedHistoryDetails = history_details.filter(
            (item) => item.id !== id
        );

        setNewHistory(updatedHistory);
        setHistorydetails(updatedHistoryDetails);
    }

    const updateUser = async () => {
        let user = updatedUser;
        console.log(newCart);
        console.log(newHistory);
        user.cartData = newCart;
        user.history = newHistory;
        console.log(user);

        await fetch('http://localhost:4000/updateuser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((resp) => resp.json()).then((data) => {
            data.success ? alert("User Edit.") : alert("Edit User failed")
        })
    }

    return (
        <div className='user-details'>
            {edit ? <button onClick={updateUser}>Done Edit</button> : null}
            <div className="user-details-top">
                <div className="user-details-top-left">
                    <h1>User Account Info</h1>
                    <div className="user-itemfield">
                        <p>Username:</p>
                        <input value={updatedUser.username} onChange={changeHandler} type="text" name='username' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Email Address:</p>
                        <input value={updatedUser.email} type="text" name='email' />
                    </div>
                    <div className="user-itemfield">
                        <p>password:</p>
                        <input value={updatedUser.password} onChange={changeHandler} type="text" name='password' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Last Login:</p>
                        <input value={updatedUser.last_login} type="text" name='name' />
                    </div>
                    <div className="user-itemfield">
                        <p>Join Date:</p>
                        <input value={updatedUser.date} type="text" name='name' />
                    </div>
                    <div className="user-itemfield">
                        <p>Name:</p>
                        <input value={updatedUser.name} onChange={changeHandler} type="text" name='name' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Mobile:</p>
                        <input value={updatedUser.mobile} onChange={changeHandler} type="text" name='mobile' readOnly={!edit} />
                    </div>
                </div>
                <div className="user-details-top-right">
                    <h1>Address Details</h1>
                    <div className="user-itemfield">
                        <p>Room:</p>
                        <input value={updatedUser.address.room} onChange={changeAddressHandler} type="text" name='room' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Floor:</p>
                        <input value={updatedUser.address.floor} onChange={changeAddressHandler} type="text" name='floor' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Building:</p>
                        <input value={updatedUser.address.building} onChange={changeAddressHandler} type="text" name='building' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>Area:</p>
                        <input value={updatedUser.address.area} onChange={changeAddressHandler} type="text" name='area' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>District:</p>
                        <input value={updatedUser.address.district} onChange={changeAddressHandler} type="text" name='district' readOnly={!edit} />
                    </div>
                    <div className="user-itemfield">
                        <p>City:</p>
                        <input value={updatedUser.address.city} onChange={changeAddressHandler} type="text" name='city' readOnly={!edit} />
                    </div>
                </div>
            </div>
            <div className="user-cart">
                <h1>User Shopping Cart</h1>
                <div className="user-cart-format-main">
                    <p>ID</p>
                    <p>Products</p>
                    <p>Name</p>
                    <p>Option</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                    {edit ? <p>Remove</p> : null}
                </div>
                <div className="user-cart-list">
                    {cart_details.map((product, index) => {
                        return (
                            <div key={index} className="user-cart-format-main user-cart-list-item">
                                <p>{product.id}</p>
                                <img src={product.image} className="listproduct-product-image" alt="" />
                                <p>{product.name}</p>
                                <p>{product.option}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity}</p>
                                <p>${product.quantity * product.price}</p>
                                {edit ? <img onClick={() => { removeCartItem(product.id, product.option) }} className='listproduct-icon-remove' src={remove_icon} alt="" /> : null}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="user-history">
                <h1>User History</h1>
                <div className="user-history-format-main">
                    <p>ID</p>
                    <p>Products</p>
                    <p>Name</p>
                    {edit ? <p>Remove</p> : null}
                </div>
                <div className='user-history-list'>
                    {history_details.map((product, index) => {
                        return (
                            <div key={index} className="user-history-format-main user-cart-list-item">
                                <p>{product.id}</p>
                                <img src={product.image} className="listproduct-product-image" alt="" />
                                <p>{product.name}</p>
                                {edit ? <img onClick={() => { removeHistory(product.id) }} className='listproduct-icon-remove' src={remove_icon} alt="" /> : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserDetails