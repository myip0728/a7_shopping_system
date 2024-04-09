import React, { useContext, useState } from 'react';
import './CSS/Payment.css';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom'
import visa_icon from '../Components/Assets/Visa.png'
import mastercard_icon from '../Components/Assets/Mastercard.png'
import paypal_icon from '../Components/Assets/Paypal.png'

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state;
  const { removeitem } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [name, setName] = useState();
  const [expirationMM, setExpirationMM] = useState();
  const [expirationYY, setExpirationYY] = useState();
  const [cvv, setCVV] = useState();

  function checkingNumString(str, n) {
    // Remove leading/trailing whitespace from the string
    const trimmedStr = str.trim();

    // Check if the trimmed string is empty
    if (trimmedStr.length === 0) {
      return false;
    }

    // Check if the trimmed string contains only numeric characters
    if (!/^\d+$/.test(trimmedStr)) {
      return false;
    }

    // Check if the number of digits matches n
    if (trimmedStr.length !== n) {
      return false;
    }

    return true;
  }

  console.log(items)

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleExpirationMM = (event) => {
    setExpirationMM(event.target.value);
  };

  const handleExpirationYY = (event) => {
    setExpirationYY(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation and submit card details to the backend or handle the payment process as desired
    if (checkingNumString(cardNumber, 16) && checkingNumString(expirationMM, 2) && checkingNumString(expirationYY, 2) && checkingNumString(cvv, 3) && parseInt(expirationMM) <= 12) {
      console.log('Payment Method:', paymentMethod);
      console.log('Card Number:', cardNumber);
      console.log('Expiration Date:', expirationMM + "/" + expirationYY);
      console.log('CVV:', cvv);

      //perform cart item removal
      const UpdateCart = async () => {
        for (let i = 0; i < items.length; i++) {
          //Remove the item from users' shopping cart
          await removeitem(items[i].productId, items[i].option);
        };
      }

      const UpdateStorage = async () => {
        for (let i = 0; i < items.length; i++) {
          //Remove the corresponding quantity of product from database
          try {
            const response = await fetch('http://localhost:4000/paymentsuccess', {
              method: 'POST',
              headers: {
                Accept: 'application/form-data',
                token: localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ "productId": items[i].productId, "quantity": items[i].quantity }),
            });
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        };
      }

      UpdateCart();
      UpdateStorage();

      //Return payment success page
      navigate('/paymentsuccess');

    } else {
      alert("Error: Invalid Input Credit Card Details")
    }

  };

  return (
    <div>
      {localStorage.getItem('token')
        ?
        <div className='payment-container'>
          <h1>PAYMENT</h1>
          <form className='payment-form' onSubmit={handleSubmit}>
            <p>Please choose your payment method.</p>
            <div className='payment-method'>
              <input type='radio' id="Visa" name="payment" value="Visa" onChange={handlePaymentMethodChange} required />
              <img src={visa_icon} alt='' />
              <input type='radio' id="MasterCard" name="payment" value="MasterCard" onChange={handlePaymentMethodChange} required />
              <img src={mastercard_icon} alt='' />
              <input type='radio' id="PayPal" name="payment" value="PayPal" onChange={handlePaymentMethodChange} required />
              <img src={paypal_icon} alt='' />
            </div>

            <div className='card-details'>
              <div className="card-details-form">
                <label htmlFor='cardNumber'>Card Number:</label>
                <input
                  type='text'
                  id='cardNumber'
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder='XXXX-XXXX-XXXX-XXXX'
                  required
                />
                <label htmlFor='cardNumber'>Card holder name:</label>
                <input
                  type='text'
                  id='cardNumber'
                  value={name}
                  onChange={handleNameChange}
                  placeholder='e.g. Chan Tai Man'
                  required
                />
                <div className="card-details-bottom">
                  <label htmlFor='expirationDate'>Expiration Date:</label>
                  <div className="card-details-Expirationdate">
                    <input
                      type='text'
                      id='expirationMM'
                      value={expirationMM}
                      onChange={handleExpirationMM}
                      placeholder='MM'
                      required
                    />
                    <input
                      type='text'
                      id='expirationYY'
                      placeholder='YY'
                      value={expirationYY}
                      onChange={handleExpirationYY}
                      required
                    />
                  </div>
                </div>
                <label htmlFor='cvv'>CVV:</label>
                <input
                  type='text'
                  id='cvv'
                  value={cvv}
                  onChange={handleCVVChange}
                  placeholder='CVV'
                  required
                />
              </div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div> :

        <div className="Not-login">
          <h1>Seems like you haven't login, Let's login to see more</h1>
        </div>
      }
    </div>
  );
};

export default Payment;