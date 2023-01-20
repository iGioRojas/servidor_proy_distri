
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  const id = event["pathParameters"]["id"];
  models.serviciomantenimiento
    .findAll({ where: { id_mecanico: id } })
    .then(datos => {

      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data:{ cantidad: datos.length } }),
      };
      return response;
    });

}
