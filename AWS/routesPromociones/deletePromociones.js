const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event) {
    const idPromo = event["pathParameters"]["id"];
    models.promociones
    .findOne({ where: { id_promocion: idPromo } })
    .then(promocion => {
        promocion.destroy();
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