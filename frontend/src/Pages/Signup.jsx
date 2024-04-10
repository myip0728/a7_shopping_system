import React from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { useState } from "react";


export const Signup = () => {
    const [visible1, setVisible1] = useState(false); //Password 1 visibility
    const [visible2, setVisible2] = useState(false); //Password 2 visibility

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        let responseData;
        if (formData.password === formData.confirmPassword) {

            await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json()).then((data) => responseData = data)
            if (responseData.success) {
                localStorage.setItem('token', responseData.token);
                window.location.replace("/");
            }
            else {
                alert(responseData.errors)
            }
        } else {
            alert("Passwords don't match, please try again.")
        }
    }

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='loginsignup'>
            <div className="signup-container">
                <h1>Sign Up</h1>
                <div className='loginsignup-fields'>
                    <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Username' required />
                </div>
                <div className='loginsignup-fields'>
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Eamil Address' required />
                </div>
                <div className='loginsignup-fields'>
                    <input name='password' value={formData.password} onChange={changeHandler} type={visible1 ? "text" : "password"} placeholder='Password' required />
                    <div onClick={() => setVisible1(!visible1)}>
                        {visible1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <div className='loginsignup-fields'>
                    <input name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} type={visible2 ? "text" : "password"} placeholder='Confirm Password' required />
                    <div onClick={() => setVisible2(!visible2)}>
                        {visible2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                </div>
                <button onClick={() => signup()}>Continue</button>
                <p className="loginsignup-login">Already have an account? <Link style={{ textDecoration: 'none' }} to='/login'><span>Login Here</span></Link></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' required="true" />
                    <p>By continuing, i agree to the terms of use & privacy.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
