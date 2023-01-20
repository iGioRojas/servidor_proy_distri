const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    const idUsuario = event["pathParameters"]["id"];
    models.usuarios
    .findAll({
      where: { id_usuario: idUsuario },
      include: { model: models.autos, as: "autos", foreignKey: "propietario" },
    })
    .then(autos => {
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: autos }),
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