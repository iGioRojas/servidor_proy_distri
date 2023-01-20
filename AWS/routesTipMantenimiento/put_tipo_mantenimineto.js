
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  event.body = JSON.parse(event.body);
  models.tipomantenimiento
    .update({
      descripcion: event.body.descripcion,
      precio: event.body.precio,
    })
    .then(responseQuery => {
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
            statusCode: 500,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: err}),
          };
        return response;
    });
}
