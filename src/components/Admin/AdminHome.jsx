import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminHome() {

  const [users, setUsers] = useState([]);
  // const [page, setPage] = useState([]);
  // const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async() => {
    // const token = localStorage.getItem('token');
    // const authToken = `Bearer ${token}`;
   try {const result = await axios.get('http://localhost:4000/authenticate/get-users', 
    // { 
    //   headers: {
    //   Authorization: authToken,
    // }}
    );
    console.log(result)
    setUsers(result.data.users);} catch(e) {
      console.log(e);
    }
    // console.log(data)
  }

  async function onDeleteUser(id) {
    //  const token = localStorage.getItem('token');
    //  const authToken = `Bearer ${token}`;
    try {
      await axios.delete(`http://localhost:4000/authenticate/remove-user/${id}`, {
        // headers: {
        //   Authorization: authToken,
        // }
      });
      fetchUsers();
    } catch (e) {
      console.log(e);

    }
  }

  // function onSearch(e) {
  //   e.preventDefault();
  //   if(!search) return;
  //   let query = `?username[$regex]=${search}&username[$options]=i`;
  //   fetchUsers(query);
  // }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>

<div className="home-container">
  <div className="home-add-search-container">
    <div >
      <Link to='/create' className='add-user-btn'>Add User</Link> 
    </div>

    <div>
    </div>
    <Link to='/login' className='sign-out-btn'>Sign Out</Link> 
  </div>
  <hr />
   <div className="users-collection-container">
        <table className="users-table">
            <thead>
                <tr className="table-head-row">
                    <th>No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
               {users.map((user, index) => (
                <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="user-btns btn-update"
                    to={"/update/" + user._id}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <Link className="user-btns btn-delete" onClick={()=>onDeleteUser(user._id)}>Delete</Link>
                </td>
              </tr>
               ))}
            </tbody>
        </table>
   </div>
</div>
    </div>
  )
}

export default AdminHome