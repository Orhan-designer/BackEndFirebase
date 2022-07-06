"use strict";

module.exports = (app) => {
  const user = require("./../settings/firebaseDb");
  const farm = require("./../Controllers/farmController");
  const coops = require("./../Controllers/coopsController");
  const sensors = require("./../Controllers/sensorsController");

  app.route("/api/auth/signup").post(user.signUp);
  app.route("/api/auth/signin").post(user.signIn);
  app.route("/api/create-farms").post(farm.createFarm);
  app.route("/api/farms").get(farm.getFarms);
  app.route("/api/create-coops").post(coops.createCoops);
  app.route("/api/coops/:id").get(coops.getCoops);
  app.route("/api/create-coops").post(sensors.createSensors);
  app.route("/api/create-coops").get(sensors.getSensors);
};
