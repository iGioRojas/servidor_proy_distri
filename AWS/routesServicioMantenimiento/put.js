
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  event.body = JSON.parse(event.body);

  models.serviciomantenimiento
    .update({
      id_auto: event.body.id_auto,
      id_mecanico: event.body.id_mecanico,
      tipo_movilizacion: event.body.tipo_movilizacion,
      fecha_pedido: event.body.fecha_pedido,
      precio_total: event.body.precio_total,
      id_horario: event.body.id_horario,
    })
    .then(responseQuery => {
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: responseQuery }),
      };
      return response;
    })
    .catch(err => {
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: err }),
      };
      return response;
    });
}
