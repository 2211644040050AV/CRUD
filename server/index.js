const express = require('express');  
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/crud')

app.get('/', (req, res) => {
    UserModel.find({}).then(users => res.json(users)).catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body).then(useers => res.json(users)).catch(err => res.json(err));
})

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id}) 
        .then(users => res.json(users)) 
        .catch(err => res.status(500).json({ error: err.message })); 
});

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, { name: req.body.name, age: req.body.age, email: req.body.email }, { new: true }) 
        .then(user => res.json(user)) 
        .catch(err => res.status(500).json({ error: err.message })); 
});

app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id) 
        .then(users => res.json(users)) 
        .catch(err => res.status(500).json({ error: err.message })); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
