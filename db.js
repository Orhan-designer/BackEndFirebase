"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, update } = require("firebase/database");
const { getAuth } = require("firebase/auth");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const e = require("express");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe4eVSY9V7C-qnk25w8YVEBDw5wII2s2w",
  authDomain: "loginpage-ef8b6.firebaseapp.com",
  databaseURL: "https://loginpage-ef8b6-default-rtdb.firebaseio.com",
  projectId: "loginpage-ef8b6",
  storageBucket: "loginpage-ef8b6.appspot.com",
  messagingSenderId: "130823781043",
  appId: "1:130823781043:web:24bc4a95e5cccd0a8b0ec6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

exports.signUp = (req, res) => {
  const email = req.body.email;
  const salt = bcrypt.genSaltSync(15);
  const password = bcrypt.hashSync(req.body.password, salt);
  const payload = { subject: email };
  const token = jwt.sign(payload, "secretKey");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password,
        token: `Bearer ${token}`,
      });
      console.log("User created");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.signIn = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = bcrypt.compare(req.body.password);
  if (password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const dt = new Date();

        update(ref(database, "users/" + user.uid), {
          email: email,
          password: password,
          last_login: dt,
        });
        console.log("User logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
