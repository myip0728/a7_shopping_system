import React, { useContext, useEffect, useState } from 'react'
import './CSS/UserPage.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const UserPage = () => {
    const { all_product, username, email, password, history, date, address, name, mobile, updateAddress, updateMobile, updatedName } = useContext(ShopContext);
    const [historyProduct, setHistoryProduct] = useState([]);
    const [recommendProduct, setRecommendProduct] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newAddress, setNewAddress] = useState({
        room: address.room,
        floor: address.floor,
        building: address.building,
        area: address.area,
        district: address.district,
        city: address.city
    })
    const [newName, setNewName] = useState(name);
    const [newMobile, setNewMobile] = useState(mobile);

    useEffect(() => {

        if (history.length !== 0) {
            const updatedHistoryProduct = history.map((productId) =>
                all_product.find((product) => product.id === productId)
            );
            setHistoryProduct(updatedHistoryProduct);

            const categoryCounts = updatedHistoryProduct.reduce((counts, product) => {
                if (product && product.category) {
                    counts[product.category] = (counts[product.category] || 0) + 1;
                }
                return counts;
            }, {});

            const mostFrequentCategory = Object.keys(categoryCounts).reduce(
                (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b)
            );

            const recommendedProducts = all_product.filter(
                (product) => product.category === mostFrequentCategory
            );
            setRecommendProduct(recommendedProducts.slice(0, 4));
        } else {
            setRecommendProduct(all_product.sort((a, b) => b.rating - a.rating).slice(0, 4))
        }
    }
        , [history, all_product]);

    const handleAddressChange = (e) => {
        const { id, value } = e.target;
        setNewAddress((prevAddress) => ({ ...prevAddress, [id]: value }));

        //Sending update request to server through shopcontext
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
        //Sending update request to server through shopcontext
    };

    const handleMobileChange = (e) => {
        setNewMobile(e.target.value);
        //Sending update request to server through shopcontext
    };

    return (
        <div>
            <div className="userprofile-main">
                <div className='user-profile heading'>
                    <h1>User Profile</h1>
                    {!edit ?
                        <div className='editbutton' onClick={() => setEdit(true)} > Edit Address, Name or Mobile</div> :
                        <div className='editbutton' onClick={() => setEdit(false)}> Done Edit</div>
                    }
                </div>
                <div className="user-details">
                    <div className="user-details-left">
                        <h1>Username</h1>
                        <p>{username}</p>
                        <h1>Email</h1>
                        <p>{email}</p>
                        <h1>Password</h1>
                        <p>{password}</p>
                        <h1>Join Date</h1>
                        <p>{date}</p>
                    </div>
                    <div className="user-details-right">
                        <h1>Address</h1>
                        <form>
                            <label for="room">Room:</label>
                            <input type="text" id="room" value={newAddress.room} onChange={handleAddressChange} readOnly={!edit}></input>
                            <label for="floor">floor:</label>
                            <input type="text" id="floor" value={newAddress.floor} onChange={handleAddressChange} readOnly={!edit}></input>
                            <label for="building">Building:</label>
                            <input type="text" id="building" value={newAddress.building} onChange={handleAddressChange} readOnly={!edit}></input>
                            <label for="area">Area:</label>
                            <input type="text" id="area" value={newAddress.area} onChange={handleAddressChange} readOnly={!edit}></input>
                            <label for="district">District:</label>
                            <input type="text" id="district" value={newAddress.district} onChange={handleAddressChange} readOnly={!edit}></input>
                            <label for="city">City:</label>
                            <input type="text" id="city" value={newAddress.city} onChange={handleAddressChange} readOnly={!edit}></input>
                        </form>
                        <h1>Name</h1>
                        <form>
                            <input type="text" id="name" value={newName} onClick={handleNameChange} readOnly={!edit}></input>
                        </form>
                        <h1>mobile</h1>
                        <form>
                            <input type="text" id="mobile" value={newMobile} onClick={handleMobileChange} readOnly={!edit}></input>
                        </form>
                    </div>
                </div>
                <div className="user-History">
                    <h1>History</h1>
                    <div className='item-display'>
                        {historyProduct.map((item, i) => {
                            return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                        })}
                    </div>
                </div>
                <div className="user-recommendation">
                    <h1>Recommend for you</h1>
                    <div className='item-display'>
                        {recommendProduct.map((item, i) => {
                            return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage