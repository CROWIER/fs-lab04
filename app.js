const express = require('express');

const mongoose = require("mongoose");

const app = express();
const port = 3000;


mongoose.connect('mongodb+srv://Askar:1234567iz@cluster0.iftn8ij.mongodb.net/?retryWrites=true&w=majority/myDB');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    city: {
        type: String,
        required: true,
        match: /^[a-zA-Z ]+$/
    },
    website: {
        type: String,
        required: true,
        match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    },
    zip: {
        type: String,
        required: true,
        match: /^\d{5}-\d{4}$/
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{1}-\d{3}-\d{3}-\d{4}$/
    }
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        website: req.body.website,
        zip: req.body.zip,
        phone: req.body.phone
    });

    user.save()
        .then(() => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
});