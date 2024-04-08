import React, { useEffect, useState } from 'react'
import './ListUser.css'
import cross_icon from '../../assets/cross_icon.png' 

const ListUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    await fetch('http://localhost:4000/alluser')
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const removeUser = async (email) => {
    await fetch('http://localhost:4000/removeuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    await fetchUsers();
  }

  return (
    <div className='list-user'>
      <h1>All Users</h1>
      <div className="listuser-format-main">
        <p>Username</p>
        <p>Email</p>
        <p>Remove</p>
      </div>
      <div className="listuser-allusers">
        <hr />
        {allUsers.map((user, index) => {
          return (
            <div key={index} className="listuser-format-main listuser-format">
              <p>{user.username}</p>
              <p>{user.email}</p>
              <img onClick={() => {removeUser(user.email)}} className='listuser-remove-icon' src={cross_icon} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListUser