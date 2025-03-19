import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateUser() {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3000/getUser/'+id)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setEmail(res.data.email);
      })
      .catch((err) => console.log(err));
  }, [id]); 

  const handleUpdate = (e) => {
    e.preventDefault();
    
    axios
      .put(`http://localhost:3000/updateUser/`+id, { name, age, email })
      .then((res) => {
        console.log(res.data);
        alert("User updated successfully!");
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}> 
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Save Changes</button> {/* ✅ Fixed button */}
        </form>
      </div>
    </div>
  );
}
