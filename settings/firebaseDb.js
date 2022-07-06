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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-D7arV4svUwuAPZvZBHnvfbVaf3fH5LM",
  authDomain: "salus-7dbd9.firebaseapp.com",
  databaseURL: "https://salus-7dbd9-default-rtdb.firebaseio.com",
  projectId: "salus-7dbd9",
  storageBucket: "salus-7dbd9.appspot.com",
  messagingSenderId: "1051098864834",
  appId: "1:1051098864834:web:1a75a42452df2c4b7a2f5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

exports.signUp = (req, res) => {
  const email = req.body.email;
  // const salt = bcrypt.genSaltSync(15);
  const password = new Buffer(req.body.password).toString("base64");
  // const password = bcrypt.hashSync(req.body.password, salt);
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
      res.send({ token: token, user: email });
      // res.send(200).json({ token: token, user: { email, password } });
      console.log("User created");
    })
    .catch((error) => {
      res.send({
        message: error,
      });
    });
};

exports.signIn = (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  // const password = bcrypt.compare(req.body.password);
  const password = new Buffer(req.body.password).toString("base64");
  const token = jwt.sign(
    {
      email: email,
    },
    "supersecret",
    {
      expiresIn: 120 * 120,
    }
  );

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const dt = new Date();

      update(
        ref(database, "users/" + user.uid),
        {
          email: email,
          password: password,
          token: token,
          last_login: dt,
        },
        res.send({ token: token, user: email })
      );

      console.log("User logged in!");
    })
    .catch((error) => {
      res.send({
        message: error,
      });
    });
};
