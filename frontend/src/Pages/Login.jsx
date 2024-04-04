import React from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { useState } from "react";

export const Login = () => {
    //Testing whether the user wants the password to be visible
    const [visible, setVisible] = useState(false);

    const login = async () => {
        console.log("Login Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
            }).then((response)=>{return response.json()}).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('token',responseData.token);
            window.location.replace='/'
        }
        else {
            alert(responseData.error)
        }
    }

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='loginsignup'>
            <div className="login-container">
                <h1>Login</h1>
                <div className='loginsignup-fields'>
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                </div>
                <div className='loginsignup-fields'>
                    <input name='password' value={formData.password} onChange={changeHandler} type={visible ? "text" : "password"} placeholder='Password' />
                    <div onClick={() => setVisible(!visible)}>
                        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <button onClick={()=>login()}>Continue</button>
                <p className="loginsignup-login">Dont have an account? <Link style={{ textDecoration: 'none' }} to='/signup'><span>Sign up Here</span></Link></p>
                <div className="loginsignup-agree">
                </div>
            </div>
        </div>
    )
}

export default Login
