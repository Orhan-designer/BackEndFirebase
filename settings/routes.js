"use strict";

module.exports = (app) => {
  const user = require("./../settings/firebaseDb");

  app.route("/api/auth/signup").post(user.signUp);
  app.route("/api/auth/signin").post(user.signIn);
};
