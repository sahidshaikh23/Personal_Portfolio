const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UsersMsg = require('./UserModel');
require('dotenv').config({ path: './.env' });
var bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connection Successfully');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/', async (req, res) => {
  res.send('Your are runnung on server ');
});

app.post('/user-message', async (req, res) => {
  const { name, email, message } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  // Validate the email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Create the user message object and save it to the database
    await new UsersMsg({ name, email, message }).save();

    // Respond to the client
    res.status(201).json({
      message: 'Your message was successfully sent',
    });
  } catch (error) {
    // Handle database or other errors
    console.error('Error saving user message:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while saving your message' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});
