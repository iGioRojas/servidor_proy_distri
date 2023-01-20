const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
    event.body = JSON.parse(event.body);
    models.serviciogrua
    .update(
      {
        id_conductor: event.body.id_conductor,
        id_auto: event.body.id_auto,
        ubicacion_latitud: event.body.ubicacion_latitud,
        ubicacion_longitud: event.body.ubicacion_longitud,
        fecha: event.body.fecha,
        hora_inicio: event.body.hora_inicio,
        hora_final: event.body.hora_final,
        id_promocion: event.body.id_promocion,
      },
      { where: { id_servicio_grua: event.body.id_servicio_grua } }
    )
    .then(responseQuery => {
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