import React, { useState } from 'react';
import "./registration.css";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "", password: ""
    })

    const navigate = useNavigate();

    const { mutate } = useMutation((userData) =>
        fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json"
            }
        }),
        {
            onSuccess: async (data) => {
                alert("Login Successful");
                if (alert) {
                    localStorage.setItem(data.token)
                    navigate("/")
                }
            },
            onError: (error) => {
                alert("Something went wrong!");
            }
        }

    );

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserDetails({ ...userDetails, [name]: value });
    }
    return (
        <div className='credentialsContainer'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' placeholder='johndoe@gmail.com' value={userDetails.name} onChange={handleInputs} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' placeholder='********' value={userDetails.name} onChange={handleInputs} />

            <button type='submit' className='register' onClick={() => mutate({ ...userDetails })}>Login</button>
        </div>
    )
}

export default Login