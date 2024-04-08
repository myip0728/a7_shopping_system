import React, { useState } from 'react';
import './CSS/Payment.css';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation and submit card details to the backend or handle the payment process as desired

    console.log('Payment Method:', paymentMethod);
    console.log('Card Number:', cardNumber);
    console.log('Expiration Date:', expirationDate);
    console.log('CVV:', cvv);
  };

  return (
    <div className='payment-container'>
      <h1>Payment</h1>
      <form className='payment-form' onSubmit={handleSubmit}>
        <div className='payment-method'>
          <label htmlFor='paymentMethod'>Payment Method:</label>
          <select id='paymentMethod' value={paymentMethod} onChange={handlePaymentMethodChange} required>
            <option value=''>Select Payment Method</option>
            <option value='Mastercard'>Mastercard</option>
            <option value='Visa'>Visa</option>
          </select>
        </div>
        {paymentMethod === 'Mastercard' || paymentMethod === 'Visa' ? (
          <div className='card-details'>
            <label htmlFor='cardNumber'>Card Number:</label>
            <input
              type='text'
              id='cardNumber'
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />

            <label htmlFor='expirationDate'>Expiration Date:</label>
            <input
              type='text'
              id='expirationDate'
              value={expirationDate}
              onChange={handleExpirationDateChange}
              required
            />

            <label htmlFor='cvv'>CVV:</label>
            <input
              type='text'
              id='cvv'
              value={cvv}
              onChange={handleCVVChange}
              required
            />
          </div>
        ) : null}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Payment;