const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event){
    const id = event["pathParameters"]["id"];
    models.usuarios
    .findOne({ where: { id_usuario: id } })
    .then(usuario => {usuario.destroy();
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: true }),
          };
          return response;
    })
    .catch(err => {
        const response = {
            statusCode: 400,
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