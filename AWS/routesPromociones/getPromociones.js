const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    models.promociones
    .findAll({})
    .then(promociones => {
        console.log(promociones);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: promociones}),
          };
          return response;
    })
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