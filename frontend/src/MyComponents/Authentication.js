import React, { useState } from 'react'
import "./Authentication.css";
import SignUp from './Registration/SignUp';
import Login from './Registration/Login';

const Authentication = () => {
    const [switchTab, setSwitchTab] = useState("login");

    function handleSwitch(tab) {
        setSwitchTab(tab)
    }

    return (
        <div className='container'>
            <div className='registrationContainer'>
                <h2>REGISTRATION</h2>
                <div className='switchTabs'>
                    <button className={switchTab == "login" ? "switch color" : "switch"} id="login" onClick={() => handleSwitch("login")}>Login</button>
                    <button className={switchTab == "signup" ? "switch color" : "switch"} id="signup" onClick={() => handleSwitch("signup")}>Sign-Up</button>
                </div>

                {switchTab == "login" ? <Login /> : <SignUp />}
            </div>
        </div>
    )
}

export default Authentication