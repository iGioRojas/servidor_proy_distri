const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    const idAuto = event["pathParameters"]["id"];
    models.autos
    .findOne({ where: { id_auto: idAuto } })
    .then(auto => {
      auto.destroy();
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data: true}),
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