const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UserModel = require('./models/user');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

mongoose.connect("mongodb://localhost:27017/crud");

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => console.log(err));
});

app.get('/getusers/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

app.put('/update/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;
    const updateData = { name, email, age };
    if (req.file) updateData.image = req.file.filename;
    UserModel.findByIdAndUpdate({ _id: id }, updateData, { new: true })
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

app.post('/create', upload.single('image'), (req, res) => {
    const { name, email, age } = req.body;
    const image = req.file ? req.file.filename : '';
    UserModel.create({ name, email, age, image })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});