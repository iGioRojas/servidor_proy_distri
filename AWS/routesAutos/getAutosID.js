const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  const idAuto = event["pathParameters"]["id"];
    models.autos
    .findOne({ where: { propietario: idAuto } })
    .then(autos => {
        console.log(autos);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: autos}),
          };
          return response;})
    .catch(err => {
        console.error(err);
        const response = {
            statusCode: 404,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: "Error "+ err,
            }),
          };
        return response;
    });
}