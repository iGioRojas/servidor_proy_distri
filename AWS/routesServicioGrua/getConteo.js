const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event){
    models.serviciogrua
    .findAll({
      limit: 6,
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_servicios"],
        [sequelize.fn("YEAR", sequelize.col("fecha")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha")),
        sequelize.fn("MONTH", sequelize.col("fecha")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha")), "DESC"],
      ],
    })
    .then(datos => {
        console.log(datos);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: datos}),
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