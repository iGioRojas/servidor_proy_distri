const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  models.tipomantenimiento
    .findAll({
      attributes: [
        "id_tipoMantenimiento",
        [sequelize.fn("COUNT", sequelize.col("id_proceso")), "cantidad"],
        "descripcion",
      ],
      include: {
        model: models.procesomantenimiento,
        as: "procesomantenimientos",
        foreignKey: "tipoMantenimiento",
      },
      group: ["id_tipoMantenimiento"],
    })
    .then(datos => {
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: datos }),
      };

    })
    .catch(err => {

      console.error(err);
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
    }


    );
}
