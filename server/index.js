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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
