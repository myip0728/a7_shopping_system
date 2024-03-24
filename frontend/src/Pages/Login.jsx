import React from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { useState } from "react";

export const Login = () => {
    //Testing whether the user wants the password to be visible
    const [visible, setVisible] = useState(false);

    return (
        <div className='loginsignup'>
            <div className="login-container">
                <h1>Login</h1>
                <div className='loginsignup-fields'>
                    <input type="email" placeholder='Eamil Address' />
                </div>
                <div className='loginsignup-fields'>
                    <input type={visible ? "text" : "password"} placeholder='Password' />
                    <div onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Dont have an account? <Link style={{ textDecoration: 'none' }} to='/signup'><span>Sign up Here</span></Link></p>
                <div className="loginsignup-agree">
                </div>
            </div>
        </div>
    )
}

export default Login
