const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Port = 3003;
const sanitizeHtml = require('sanitize-html');
const bcrypt = require('bcrypt');
const validator = require('validator');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/Authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String
});

const UserModel = mongoose.model("cruds", UserSchema);

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.get("/user", (req, res) => {
  UserModel.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: "Bad request" });
    });
});

async function encryptPassword(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    req.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (err) {
    res.status(500).json({ error: "Error encrypting password", details: err.message });
  }
}

app.post('/signup', encryptPassword, async (req, res) => {
  const data = req.body;
  const name = sanitizeHtml(data.name);
  const phone = sanitizeHtml(data.phone);
  const email = sanitizeHtml(data.email);
  const password = req.password;

  try {
    const user = await UserModel.create({
      name: name,
      phone: phone,
      email: email,
      password: password
    });
    res.status(201).json({ message: "User created successfully", user: user });
  } catch (err) {
    res.status(400).json({ error: "Error creating user", details: err.message });
  }
});

app.post('/login', async (req, res) => {
  const data = req.body;
  const emailOrPhone = sanitizeHtml(data.email);
  const password = sanitizeHtml(data.password);

  try {
    let user;

    if (validator.isEmail(emailOrPhone)) {
      user = await UserModel.findOne({ email: emailOrPhone });
    } else if (validator.isMobilePhone(emailOrPhone, 'any')) {
      user = await UserModel.findOne({ phone: emailOrPhone });
    } else {
      return res.status(400).json({ error: "Please enter a valid email or phone number and password" });
    }

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.post('/findaccount', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const sanitizedEmail = sanitizeHtml(email);

  try {
    const user = await UserModel.findOne({ email: sanitizedEmail });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    req.session.email = sanitizedEmail;

    res.status(200).json({ message: "Account found", user: user });
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.post('/resetaccount', encryptPassword, async (req, res) => {
  const password = req.password;
  try {
    const user = await UserModel.updateOne({ email: req.body.email }, { password: password });
    if (!user) {
      return res.status(400).json({ error: "No user exists" });
    }
    res.status(200).json({ message: "Password updated", user: user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
