
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  event.body = JSON.parse(event.body);
  models.serviciomantenimiento.create(req.body);
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: true }),
  };
  return response;
}
