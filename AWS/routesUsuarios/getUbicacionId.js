const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    const id = event["pathParameters"]["id"];
    models.ubicacion
    .findOne({ where: { id_ubicacion: id } })
    .then(usuarioSeccion => {
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: usuarioSeccion }),
          };
          return response;
    })
    .catch(err => {
        const response = {
            statusCode: 500,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: "Error " + err,
            }),
          };
          return response;
    });
}