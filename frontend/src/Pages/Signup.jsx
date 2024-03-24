import React from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { useState } from "react";


export const Signup = () => {
    const [visible1, setVisible1] = useState(false); //Password 1 visibility
    const [visible2, setVisible2] = useState(false); //Password 2 visibility

    return (
        <div className='loginsignup'>
            <div className="signup-container">
                <h1>Sign Up</h1>
                <div className='loginsignup-fields'>
                    <input type="text" placeholder='Username' />
                </div>
                <div className='loginsignup-fields'>
                    <input type="email" placeholder='Eamil Address' />
                </div>
                <div className='loginsignup-fields'>
                    <input type={visible1 ? "text" : "password"} placeholder='Password' />
                    <div onClick={() => setVisible1(!visible1)}>
                        {visible1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <div className='loginsignup-fields'>
                    <input type={visible2 ? "text" : "password"} placeholder='Confirm Password' />
                    <div onClick={() => setVisible2(!visible2)}>
                        {visible2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an account? <Link style={{ textDecoration: 'none' }} to='/login'><span>Login Here</span></Link></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
