import React, { useContext, useState } from 'react'
import './CSS/Checkout.css'
import CartItems from '../Components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';


const Checkout = () => {
  const { all_product } = useContext(ShopContext); //Getting all product details
  const { cartItems, removeitem } = useContext(ShopContext); //Getting Shopping CartItems
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const [address, setAddress] = useState({
    address: '',
    district: '',
    recipient: '',
    mobile: '',
    email: ''
  });

  const updateDelivery = () => {
    // Implement the logic to update the delivery address in the backend
    console.log('Update address:', address);
  };

  const renderAddressForm = () => {
    return (
      <div className='delivery_info'>
        <h3>Delivery information</h3>
        <input
          type='text'
          placeholder='Address'
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
        />
        <input
          type='text'
          placeholder='District'
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        />
        <input
          type='text'
          placeholder='Recipient'
          value={address.recipient}
          onChange={(e) => setAddress({ ...address, recipient: e.target.value })}
        />
        <input
          type='text'
          placeholder='Mobile no.'
          value={address.mobile}
          onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
        />
        <input
          type='text'
          placeholder='Email address'
          value={address.email}
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
        />
        <button onClick={updateDelivery}>Save Address</button>
      </div>
    );
  };

  const renderProductSummary = () => {
    const subtotal = calculateSubtotal(); // Calculate the subtotal price

    return (
      <div className='product_summary'>
        <h3>Product information</h3>
        <h4>Subtotal price: HKD {subtotal}</h4>
        <div className='checkout-product'>
          <CartItems cartItems={cartItems} removeitem={removeitem} />
        </div>
      </div>
    );
  };

  const calculateSubtotal = () => {
    // Calculate the subtotal price based on the cart items
    let subtotal = 0;
    cartItems.forEach((item) => {
      const product = all_product.find((p) => p.id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });
    return subtotal;
  };

  const renderSummary = () => {
    const subtotal = calculateSubtotal();
    const shippingFee = 10; // Example shipping fee, adjust according to your needs
    const total = subtotal + shippingFee;

    return (
      <div className='summary-container'>
        <h3>Summary</h3>
        <div className='summary-item'>
          <span>Subtotal:</span>
          <span>HKD {subtotal}</span>
        </div>
        <div className='summary-item'>
          <span>Shipping Fee:</span>
          <span>HKD {shippingFee}</span>
        </div>
        <div className='summary-item total'>
          <span>Total:</span>
          <span>HKD {total}</span>
        </div>
      </div>
    );
  };

  const handleCheckOut = () => {
    // Set the shouldNavigate state to true
    setShouldNavigate(true);
  };


  if (shouldNavigate) {
    // Navigate the user to the checkout page
    return <Navigate to="/checkout" />;
  }

  return (
    <div>
      {localStorage.getItem('token')
        ?
        <div className="checkout-main">
          <h1>CHECKOUT</h1>
          <div className="checkout-container">
            <div className='checkout-left'>
              <div className='delivery'>
                <div className='delivery_info'>
                  {renderAddressForm()}
                </div>
                {renderProductSummary()}
              </div>
            </div>
            <div className='checkout-right'>
              {renderSummary()}
            </div>
          </div>
        </div> :
        //user should be denied at the cart page if user is not login
        <div className="cart-main-not-login">
          <h1>Seems like you haven't login, Let's login to see more</h1>
        </div>
      }
    </div>
  )
}

export default Checkout
