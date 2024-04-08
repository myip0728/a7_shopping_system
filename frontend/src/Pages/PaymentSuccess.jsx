import React from 'react'

const PaymentSuccess = () => {
    return (
        <div>
            {localStorage.getItem('token')
                ?
                <div className='Not-login'>
                    <h1>Payment Complete, Thank you for choosing TechShop.</h1>
                </div> :
                <div className="Not-login">
                    <h1>Seems like you haven't login, Let's login to see more</h1>
                </div>
            }
        </div>
    )
}

export default PaymentSuccess