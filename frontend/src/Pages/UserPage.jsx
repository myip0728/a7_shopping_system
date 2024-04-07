import React, { useContext, useEffect, useState } from 'react'
import './CSS/UserPage.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const UserPage = () => {
    const { all_product, username, email, password, history, date, address, name, mobile } = useContext(ShopContext);
    const [historyProduct, setHistoryProduct] = useState([]);
    const [recommendProduct, setrecommendProduct] = useState([]);

    useEffect(() => {
        if (history.length !== 0) {
            const updatedHistoryProduct = history.map((productId) =>
                all_product.find((product) => product.id === productId)
            );
            setHistoryProduct(updatedHistoryProduct);

            const categoryCounts = updatedHistoryProduct.reduce((counts, product) => {
                counts[product.category] = (counts[product.category] || 0) + 1;
                return counts;
            }, {});

            const mostFrequentCategory = Object.keys(categoryCounts).reduce(
                (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b)
            );

            const recommendedProducts = all_product.filter(
                (product) => product.category === mostFrequentCategory
            );
            setrecommendProduct(recommendedProducts.slice(0, 4));
        } else {
            setrecommendProduct(all_product.sort((a, b) => b.rating - a.rating).slice(0, 4))
        }
    }, [history, all_product]);

    return (
        <div>
            <div className="userprofile-main">
                <h1>User Profile</h1>
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
                            <input type="text" id="room" value={address.room}></input>
                            <label for="floor">floor:</label>
                            <input type="text" id="floor" value={address.floor}></input>
                            <label for="building">Building:</label>
                            <input type="text" id="building" value={address.building}></input>
                            <label for="area">Area:</label>
                            <input type="text" id="area" value={address.area}></input>
                            <label for="district">District:</label>
                            <input type="text" id="district" value={address.district}></input>
                            <label for="city">City:</label>
                            <input type="text" id="city" value={address.city}></input>
                        </form>
                        <h1>Name</h1>
                        <form>
                            <input type="text" id="name" value={name}></input>
                        </form>
                        <h1>mobile</h1>
                        <form>
                            <input type="text" id="mobile" value={mobile}></input>
                        </form>
                    </div>
                </div>
                <div className="user-History">
                    <h1>History</h1>
                    {historyProduct.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                    })}
                </div>
                <div className="user-recommendation">
                    <h1>Recommend for you</h1>
                    {recommendProduct.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserPage