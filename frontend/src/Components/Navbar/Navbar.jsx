import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import userprofile_icon from '../Assets/userprofile.png'
import search_icon from '../Assets/search.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {
    const location = useLocation();
    const [menu, setmenu] = useState("home");
    const { getTotalCartItems } = useContext(ShopContext);

    React.useEffect(() => {
        if (location.pathname.includes('/headphone')) {
            setmenu("headphone");
        } else if (location.pathname.includes('/laptop')) {
            setmenu("laptop");
        } else if (location.pathname.includes('/mouse')) {
            setmenu("mouse");
        } else if (location.pathname.includes('/keyboard')) {
            setmenu("keyboard");
        } else {
            setmenu("home");
        }
    }, [location]);

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p onClick={() => setmenu("home")}> <Link style={{ textDecoration: 'none' }} to='/'>TechShop</Link> </p>
                </div>
                <ul className="nav-menu">
                    <li onClick={() => setmenu("headphone")}><Link to='/headphone'>Headphone</Link>{menu === "headphone" ? <hr /> : <></>}</li>
                    <li onClick={() => setmenu("laptop")}><Link to='/laptop'>Laptop</Link>{menu === "laptop" ? <hr /> : <></>}</li>
                    <li onClick={() => setmenu("mouse")}><Link to='/mouse'>Mouse</Link>{menu === "mouse" ? <hr /> : <></>}</li>
                    <li onClick={() => setmenu("keyboard")}><Link to='/keyboard'>Keyboard</Link>{menu === "keyboard" ? <hr /> : <></>}</li>
                </ul>
            </div>
            <div className="navbar-right">
                <div className="nav-login-cart">
                    <Link to='/search'><img src={search_icon} alt="" /></Link>
                    <Link to='/userpage'><img src={userprofile_icon} alt="" /></Link>
                    <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                    {localStorage.getItem('token')
                        ? <button onClick={() => { localStorage.removeItem('token'); window.location.replace('/') }}>Logout</button>
                        : <Link to='/login'><button>Login</button></Link>}
                </div>
            </div>
        </div>
    )
}
