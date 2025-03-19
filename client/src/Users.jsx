import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [Users, setUsers] = useState([]); // Create a state variable to store users

  useEffect(() => {
    // Fetch all users from the server
    axios.get("http://localhost:3000")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Delete a user from the server
    axios.delete(`http://localhost:3000/deleteUser/`+id)
    .then((res) => {
      alert("User deleted successfully!");
      setUsers(Users.filter((user) => user._id !== id))
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }

  return (  
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                <Link to={`/update/${user._id}`} className="btn btn-primary">Update</Link> 
                  <button className="btn btn-danger"
                  onClick={(e) => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
