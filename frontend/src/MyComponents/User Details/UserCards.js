import React from 'react';
import "./UserCards.css";
import { useMutation, useQuery } from 'react-query';
import Edit from '../Edit User Details/Edit';
import { useNavigate } from 'react-router-dom';

const UserCards = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery('usersList', async () => {
        const res = await fetch("/api/user/")
        return res.data
    })
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>Something went wrong!</h2>
    }

    const updateUser = (userId) => {
        <Edit id={userId} />
        navigate("/edit");
    }

    // const { mutate } = useMutation((userId) =>
    //     fetch("/api/user/delete", {
    //         method: "post",
    //         body: JSON.stringify(userId),
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //     }),
    //     {
    //         onSuccess: async (data) => {
    //             alert("User Deleted!");
    //         },
    //         onError: (error) => {
    //             alert("Something went wrong!");
    //         }
    //     }

    // );

    return (
        <>
            <h1 className='users'>Users</h1>
            <div className='UsersList'>
                {
                    data?.map((user) => {
                        return (
                            <div className='userCard' key={user.id}>
                                <div className='imageSection'>
                                    <img src={user.pic} className="avatar" alt={user.name} />
                                </div>

                                <div className='userDetails'>
                                    <label>{user.name}</label>
                                    <label>{user.email}</label>
                                    <label>{user.address}</label>
                                    <label>{user.phone}</label>

                                    <div className='editUserDetails'>
                                        {/* <button className="editButton" onClick={(e) => updateUser("user.id")}><img src="/edit.png" className='editUser' /></button>
                                        <button className="deleteButton" onClick={(e) => mutate("user.id")}><img src="/delete.png" className='deleteUser' /></button> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className='userCard'>
                    <div className='imageSection'>
                        <img src="" className="avatar" alt="" />
                    </div>

                    <div className='userDetails'>
                        <label>username</label>
                        <label>useremail</label>
                        <label>useraddress</label>
                        <label>userphone</label>

                        <div className='editUserDetails'>
                            <button className="editButton" onClick={(e) => updateUser("user.id")} ><img src="/edit.png" className='editUser' /></button>
                            {/* <button className="deleteButton" onClick={(e) => mutate("user.id")} ><img src="/delete.png" className='deleteUser' /></button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCards