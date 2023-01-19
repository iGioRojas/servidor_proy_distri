const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    event.body = JSON.parse(event.body);
    console.log(event.body);
    models.autos.create({
        placa: event.body.placa,
        marca: event.body.marca,
        modelo: event.body.modelo,
        color: event.body.color,
        clave_llave: event.body.clave,
        propietario: event.body.id_propietario
    });
    const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data: true}),
      };
    return response;
}