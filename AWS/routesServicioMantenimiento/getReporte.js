
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {

  models.serviciomantenimiento
    .findAll({
      include: [
        {
          model: models.usuarios,
          as: "usuarios",
          association: "id_mecanico_usuario",
        },
        {
          model: models.autos,
          as: "autos",
          association: "id_auto_auto",
        },
      ],
    })
    .then(manteminiento => {
        console.log(manteminiento);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: manteminiento}),
          };
          return response;
    });

}
