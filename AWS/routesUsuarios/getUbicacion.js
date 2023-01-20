const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    const idUsuario = event["pathParameters"]["id"];
    models.usuarios
    .findOne({
      where: { id_usuario: idUsuario },
      include: {
        model: models.ubicacion,
        as: "ubicacion_ubicacion",
        foreignKey: "ubicacion",
      },
    })
    .then(ubicacion => {
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: ubicacion }),
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