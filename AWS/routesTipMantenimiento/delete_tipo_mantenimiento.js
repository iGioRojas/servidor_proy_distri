const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
  event.body = JSON.parse(event.body);
  models.tipomantenimiento
    .findOne({ where: { id_tipoMantenimiento: event.body.id_tipoMantenimiento } })
    .then(tipo =>{
      tipo.destroy()
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data: true}),
      };
    })
    .catch(err => {
      console.log(err)
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
