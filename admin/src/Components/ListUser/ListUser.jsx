import React, { useEffect, useState } from 'react'
import './ListUser.css'
import view_icon from '../../assets/view_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import remove_icon from '../../assets/remove_icon.png'
import { useNavigate } from 'react-router-dom';

const ListUser = () => {
  const navigate = useNavigate();
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

  const viewUser = (email) => {
    let selecteduser;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === email) {
        selecteduser = allUsers[i];
        break; // Exit the loop once the product is found
      }
    }
    navigate('/userdetails', { state: { user: selecteduser, edit: false } });
  };

  const editUser = (email) => {
    let selecteduser;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === email) {
        selecteduser = allUsers[i];
        break; // Exit the loop once the product is found
      }
    }
    navigate('/userdetails', { state: { user: selecteduser, edit: true } });
  };

  return (
    <div className='list-user'>
      <h1>All Users</h1>
      <div className="listuser-format-main">
        <p>Email</p>
        <p>Username</p>
        <p>Password</p>
        <p>Last Login</p>
        <p>View</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="listuser-allusers">
        <hr />
        {allUsers.map((user, index) => {
          return (
            <div key={index} className="listuser-format-main listuser-format">
              <p>{user.email}</p>
              <p>{user.username}</p>
              <p>{user.password}</p>
              <p>{user.last_login}</p>
              <img onClick={() => { viewUser(user.email) }} className='listuser-icon' src={view_icon} alt="" />
              <img onClick={() => { editUser(user.email) }} className='listuser-icon' src={edit_icon} alt="" />
              <img onClick={() => { removeUser(user.email) }} className='listuser-icon-remove' src={remove_icon} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListUser