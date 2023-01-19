const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {

  models.serviciomantenimiento
    .findAll({
      limit: 6,

      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "num_servicios"],
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "año"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "mes"],
      ],
      group: [
        sequelize.fn("YEAR", sequelize.col("fecha_pedido")),
        sequelize.fn("MONTH", sequelize.col("fecha_pedido")),
      ],
      order: [
        [sequelize.fn("YEAR", sequelize.col("fecha_pedido")), "DESC"],
        [sequelize.fn("MONTH", sequelize.col("fecha_pedido")), "DESC"],
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
  .catch(err =>{
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
  })
  ;

}
