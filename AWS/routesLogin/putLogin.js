const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
require('dotenv').config();

exports.handler = async function (event){
    event.body = JSON.parse(event.body);
    models.login.create({
        correo:event.body.correo,
        contrasenia:event.body.contrasenia
      }).then(responseQuery => {
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: responseQuery}),
          };
        return response;
      })
      .catch(err => {
        const response = {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: err}),
          };
        return response;
      });
}