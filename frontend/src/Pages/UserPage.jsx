import React, { useContext, useEffect, useState } from 'react'
import './CSS/UserPage.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const UserPage = () => {
    const { all_product, username, email, password, history, date, address, name, mobile, updateAddress, updateMobile, updateName } = useContext(ShopContext);
    const [historyProduct, setHistoryProduct] = useState([]);
    const [recommendProduct, setRecommendProduct] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newAddress, setNewAddress] = useState(() => {
        const storedAddress = localStorage.getItem('newAddress');
        if (storedAddress) {
            return JSON.parse(storedAddress);
        } else {
            const initialAddress = {
                room: address.room,
                floor: address.floor,
                building: address.building,
                area: address.area,
                district: address.district,
                city: address.city,
            };
            localStorage.setItem('newAddress', JSON.stringify(initialAddress));
            return initialAddress;
        }
    })
    const [newName, setNewName] = useState(() => {
        const storedName = localStorage.getItem('newName');
        if (storedName) {
            return storedName;
        } else {
            localStorage.setItem('newName', name);
            return name;
        }
    });
    const [newMobile, setNewMobile] = useState(() => {
        const storedMobile = localStorage.getItem('newMobile');
        if (storedMobile) {
            return storedMobile;
        }
        else {
            localStorage.setItem('newMobile', mobile);
            return mobile;
        }
    });

    useEffect(() => {
        if (history.length !== 0 && all_product.length !== 0) { //Checking when the details are successfully retrieved
            const updatedHistoryProduct = history.map((productId) =>
                all_product.find((product) => product.id === productId)
            );
            setHistoryProduct(updatedHistoryProduct);

            const categoryCounts = updatedHistoryProduct.reduce((counts, product) => { //Counting the Category appear the most in of the user
                if (product && product.category) {
                    counts[product.category] = (counts[product.category] || 0) + 1;
                }
                return counts;
            }, {});

            const mostFrequentCategory = Object.keys(categoryCounts).reduce(
                (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b)
            )
            const recommendedProducts = all_product.filter( //Finding the favorite category of the user
                (product) => product.category === mostFrequentCategory
            );
            setRecommendProduct(recommendedProducts.slice(0, 4));
        } else {
            setRecommendProduct(all_product.sort((a, b) => b.rating - a.rating).slice(0, 4))
        }
    }
        , [history, all_product]);

    const UpdateUserDetails = () => { //Updating user details
        const roomInput = document.getElementById("room").value;
        const floorInput = document.getElementById("floor").value;
        const buildingInput = document.getElementById("building").value;
        const areaInput = document.getElementById("area").value;
        const districtInput = document.getElementById("district").value;
        const cityInput = document.getElementById("city").value;
        const NameInput = document.getElementById("name").value;
        const mobileInput = document.getElementById("mobile").value;

        //Setting new input
        const updatedAddress = {
            room: roomInput,
            floor: floorInput,
            building: buildingInput,
            area: areaInput,
            district: districtInput,
            city: cityInput
        };
        setNewAddress(updatedAddress);
        setNewName(NameInput);
        setNewMobile(mobileInput);

        // Update localStorage values
        localStorage.setItem('newAddress', JSON.stringify(updatedAddress));
        localStorage.setItem('newName', NameInput);
        localStorage.setItem('newMobile', mobileInput);

        updateAddress(roomInput, floorInput, buildingInput, areaInput, districtInput, cityInput);
        updateName(NameInput);
        updateMobile(mobileInput);

        // Setting the edit plane to be false
        setEdit(false);
    }

    // Add a conditional check to render the component only when all_product and history are defined
    if (!all_product || !history) {
        return null; // or display a loading indicator
    }

    return (
        <div>
            {localStorage.getItem('token')
                ?
                <div className="userprofile-main">
                    <div className='user-profile-heading'>
                        <h1>User Profile</h1>
                        {!edit ?
                            <button onClick={() => setEdit(true)} > Edit Address, Name or Mobile</button> :
                            <button onClick={UpdateUserDetails}> Done Edit</button>
                        }
                    </div>
                    <div className="user-details">
                        <div className="user-details-left">
                            <div className="user-details-item">
                                <h1>Username:</h1>
                                <p>{username}</p>
                            </div>
                            <div className="user-details-item">
                                <h1>Email:</h1>
                                <p>{email}</p>
                            </div>
                            <div className="user-details-item">
                                <h1>Password:</h1>
                                <p>{password}</p>
                            </div>
                            <div className="user-details-item">
                                <h1>Join Date:</h1>
                                <p>{date.substring(0, 10)}</p>
                            </div>
                        </div>
                        <div className="user-details-right">
                            <h1>Address:</h1>
                            <form>
                                <label for="room">Room: </label>
                                <input type="text"
                                    id="room"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"} value={!edit ? newAddress.room : null}
                                    readOnly={!edit}></input>

                                <label for="floor">floor: </label>
                                <input type="text"
                                    id="floor"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newAddress.floor : null}
                                    readOnly={!edit}></input>

                                <label for="building">Building: </label>
                                <input type="text"
                                    id="building"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newAddress.building : null}
                                    readOnly={!edit}></input>

                                <label for="area">Area: </label>
                                <input type="text"
                                    id="area"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newAddress.area : null}
                                    readOnly={!edit}></input>

                                <label for="district">District: </label>
                                <input type="text"
                                    id="district"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newAddress.district : null}
                                    readOnly={!edit}></input>

                                <label for="city">City: </label>
                                <input type="text"
                                    id="city"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newAddress.city : null}
                                    readOnly={!edit}></input>
                            </form>

                            <h1>Contact Name:</h1>
                            <form>
                                <input type="text"
                                    id="name"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newName : null}
                                    readOnly={!edit}></input>
                            </form>
                            <h1>Your Mobile Number:</h1>
                            <form>
                                <input type="number"
                                    id="mobile"
                                    className={!edit ? "user-details-right-inactive" : "user-details-right-active"}
                                    value={!edit ? newMobile : null}
                                    readOnly={!edit}
                                ></input>
                            </form>
                        </div>
                    </div>
                    <div className="user-History">
                        <h1>History</h1>
                        <div className='item-display'>
                            {historyProduct.reverse().map((item, i) => {
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
                </div> :
                <div className="Not-login">
                    <h1>Seems like you haven't login, Let's login to see more</h1>
                </div>
            }
        </div >
    )
}

export default UserPage