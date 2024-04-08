import React, { useContext, useState } from 'react'
import './CSS/Checkout.css'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { email, name, mobile, address, updateAddress, updateMobile, updateName } = useContext(ShopContext); //Getting all product, user details
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { items, totalQuantity, totalPrice } = location.state;
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
  const shippingFee = 10; // Example shipping fee, adjust according to your needs

  const handleCheckOut = () => {
    // Set the shouldNavigate state to true
    setShouldNavigate(true);
  };


  if (shouldNavigate) {
    // Navigate the user to the checkout page
    return <Navigate to="/checkout" />;
  }

  const UpdateUserDetails = () => {
    const roomInput = document.getElementById("room").value;
    const floorInput = document.getElementById("floor").value;
    const buildingInput = document.getElementById("building").value;
    const areaInput = document.getElementById("area").value;
    const districtInput = document.getElementById("district").value;
    const cityInput = document.getElementById("city").value;
    const NameInput = document.getElementById("name").value;
    const mobileInput = document.getElementById("mobile").value;

    //Setting new input
    setNewAddress({
      room: roomInput,
      floor: floorInput,
      building: buildingInput,
      area: areaInput,
      district: districtInput,
      city: cityInput
    });
    setNewName(NameInput);
    setNewMobile(mobileInput);

    updateAddress(roomInput, floorInput, buildingInput, areaInput, districtInput, cityInput);
    updateName(NameInput);
    updateMobile(newMobile);

    //Setting the edit plane to be false
    setEdit(false);
  }

  return (
    <div>
      {localStorage.getItem('token')
        ?
        <div className="checkout-main">
          <h1>CHECKOUT</h1>
          <div className="checkout-container">
            <div className='checkout-left'>
              {!edit ?
                <button onClick={() => setEdit(true)} > Update Address</button> :
                <button onClick={UpdateUserDetails}> Done Update</button>
              }
              <div className='delivery_info'>
                <h3>Delivery information</h3>
                <form>
                  <label for="room">Room: </label>
                  <input type="text" id="room" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.room : null} readOnly={!edit}></input>
                  <label for="floor">floor: </label>
                  <input type="text" id="floor" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.floor : null} readOnly={!edit}></input>
                  <label for="building">Building: </label>
                  <input type="text" id="building" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.building : null} readOnly={!edit}></input>
                  <label for="area">Area: </label>
                  <input type="text" id="area" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.area : null} readOnly={!edit}></input>
                  <label for="district">District: </label>
                  <input type="text" id="district" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.district : null} readOnly={!edit}></input>
                  <label for="city">City: </label>
                  <input type="text" id="city" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newAddress.city : null} readOnly={!edit}></input>
                  <label for="name">Recipient: </label>
                  <input type="text" id="name" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newName : null} readOnly={!edit}></input>
                  <label for="name">Recipient: </label>
                  <input type="number" id="mobile" className={!edit ? "edit-input-inactive" : "edit-input-active"} value={!edit ? newMobile : null} readOnly={!edit}></input>
                  <label for="name">Email: </label>
                  <input type="text" id="email" className="edit-input-inactive" value={email} readOnly></input>
                </form>
              </div>


              <div className='product_summary'>
                <h3>Product information</h3>
                <h4>Subtotal price: $ {totalPrice}</h4>
                {items.map((item) => {
                  return (<CartItems productId={item.productId} option={item.option} quantity={item.quantity} />)
                })}
              </div>
            </div>
            <div className='checkout-right'>
              <div className='checkout-summary'>
                <h1>Summary</h1>

                <hr />

                <div>
                  <p>Quantity</p>
                  <p>{totalQuantity} Items(s)</p>
                </div>
                <div className='checkout-summary-total'>
                  <p>Subtotal</p>
                  <p>$ {totalPrice}</p>
                </div>
                <div>
                  <p>Shipping</p>
                  <p>$ {shippingFee}</p>
                </div>

                <hr />

                <div className='checkout-summary-total'>
                  <p>Total</p>
                  <p>$ {totalPrice}</p>
                </div>
              </div>
              <button>Continue to payment</button>
            </div>
          </div>
        </div> :
        //user should be denied at the cart page if user is not login
        <div className="cart-main-not-login">
          <h1>Seems like you haven't login, Let's login to see more</h1>
        </div>
      }
    </div >
  )
}

export default Checkout
