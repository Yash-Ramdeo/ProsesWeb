import React, { useState } from 'react'
import "../Registration/registration.css";
import { useMutation } from 'react-query';
import "./EditUsers.css";
import { useNavigate } from 'react-router-dom';

const Edit = (id) => {
    const [userDetails, setUserDetails] = useState({
        id, username: "", email: "", password: "", phone: "", address: "", image: ""
    });

    const navigate = useNavigate();

    const { mutate } = useMutation((userData) =>
        fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json"
            }
        }),
        {
            onSuccess: async (data) => {
                alert("User has been Updated");
                // console.log(confirmation)
                if (alert) {
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

    const handleImage = (pic) => {
        if (pic.type === "image/jpg" || pic.type === "image.png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "prosesWeb");
            data.append("cloud_name", "gupsapp");
            fetch("https://api.cloudinary.com/v1_1/gupsapp/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    setUserDetails.image(data.url.toString());
                    console.log(data);

                }).catch((err) => console.log(err))
        }
    }
    return (
        <div className='container'>
            <div className='credentialsContainer'>
                <label htmlFor='username'>UserName</label>
                <input type='text' name='username' placeholder='John Doe' value={userDetails.name} onChange={handleInputs} />

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' placeholder='johndoe@gmail.com' value={userDetails.email} onChange={handleInputs} />

                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Your password must be of atleast 8 characters' value={userDetails.password} onChange={handleInputs} />

                <label htmlFor='phone'>Phone Number</label>
                <input type='text' name='phone' placeholder='1234567890' value={userDetails.phone} onChange={handleInputs} />

                <label htmlFor='address'>Address</label>
                <input type='text' name='address' placeholder='Full Address' value={userDetails.address} onChange={handleInputs} />

                <label htmlFor='image'>Upload Image</label>
                <input type="file" name="image" onChange={(e) => handleImage(e.target.files[0])} />

                <button className='register' onClick={() => mutate(userDetails)}>Update</button>
            </div>
        </div>
    )

}

export default Edit