const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
require('dotenv').config();

exports.handler = async  function (event) {
    models.login
    .findAll()
    .then(cliente => {
        console.log(cliente);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: cliente}),
          };
          return response;
    })
    .catch(err => {
        const response = {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: "Usuario no encontrado", error: err}),
          };
        return response;
    });
}
