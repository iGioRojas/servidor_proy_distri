const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    event.body = JSON.parse(event.body);
    sequelize
    .query(
      `Insert into Ubicacion(id_ubicacion,provincia,ciudad,referencia) values (Default, '${event.body.provincia}','${event.body.ciudad}','${event.body.referencia}')`
    )
    .then(responseQuery => {
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: true }),
          };
          return response;
    })
    .catch(error => {
        const response = {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: "Error " + error,
            }),
          };
          return response;
    });
}