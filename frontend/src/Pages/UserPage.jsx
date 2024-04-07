import React, { useContext } from 'react'
import './CSS/UserPage.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const UserPage = () => {
    const { all_product, username, email, pass, history, date, address, name, mobile } = useContext(ShopContext);

    return (
        <div>
            <div className="userprofile-main">
                <h1>User Profile</h1>
                <div className="user-details">
                    <div className="username">
                        <h1>Username</h1>
                        { }
                    </div>
                </div>
                <div className="user-History">

                </div>
                <div className="user-recommendation">

                </div>
            </div>
        </div>
    )
}

export default UserPage