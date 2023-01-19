const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    event.body = JSON.parse(event.body);
    models.autos
    .update({
      placa: event.body.placa,
      marca: event.body.marca,
      modelo: event.body.modelo,
      color: event.body.color,
      clave_llave: event.body.clave,
      propietario: event.body.id_propietario,
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
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: err}),
          };
        return response;
    });
}