const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handlder = async function (event){
    event.body = JSON.parse(event.body);
    sequelize.query(
        `update login set correo = '${event.body.correo}' where correo = '${event.body.correo_anterior}'`
    ).catch(err => {
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
    });
    sequelize
    .query(
        `update usuarios set celular='${event.body.celular}', nombres='${event.body.nombres}',apellidos='${event.body.apellidos}',fecha_nacimiento='${event.body.fecha_nacimiento}', correo = '${event.body.correo}' where id_usuario = ${event.body.idx}`
    )
    .catch(err => {
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
    });
    const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: true }),
      };
      return response;
        
}