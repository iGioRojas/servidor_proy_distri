const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event){
    event.body = JSON.parse(event.body);
    models.serviciogrua
    .findOne({
      where: { id_servicio_grua: event.body.id_servicio_grua },
    })
    .then(servicio => {
      servicio.destroy();
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