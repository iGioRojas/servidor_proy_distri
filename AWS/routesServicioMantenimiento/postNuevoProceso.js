
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  event.body = JSON.parse(event.body);

  var idprincipal = 0;
  let consulta = `
  SELECT GENERALT.id_proceso_siguiente FROM 
  ((SELECT id_proceso inicio, id_proceso id_proceso_siguiente FROM PROCESOMANTENIMIENTO P LIMIT 50)
  UNION
  SELECT id_proceso inicio, id_proceso_siguiente FROM PROCESOMANTENIMIENTO P WHERE P.ID_PROCESO_ANTERIOR IS NULL
  UNION
  SELECT INICIO.inicio, P.id_proceso_siguiente FROM PROCESOMANTENIMIENTO P, 
  (SELECT id_proceso inicio, id_proceso_siguiente FROM PROCESOMANTENIMIENTO P WHERE P.ID_PROCESO_ANTERIOR IS NULL) INICIO 
  WHERE INICIO.ID_PROCESO_SIGUIENTE = P.ID_PROCESO AND P.ID_PROCESO_SIGUIENTE IS NOT NULL) GENERALT 
  JOIN SERVICIOMANTENIMIENTO SM ON SM.ID_PROCESO_INICIAL = GENERALT.INICIO
  JOIN PROCESOMANTENIMIENTO PM ON PM.ID_PROCESO = GENERALT.ID_PROCESO_SIGUIENTE
  JOIN USUARIOS U ON SM.ID_MECANICO = U.ID_USUARIO
  WHERE id_auto = ${event.body.id_auto}
  ORDER BY id_proceso_siguiente DESC LIMIT 1;
  `;
  sequelize
    .query(consulta, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(anterior => {
      console.log(anterior);

      if (anterior.length == 0) {

        models.procesomantenimiento.create({
          fecha_actual: event.body.fecha,
          hora_actual: event.body.hora,
          observacion_mecanico: event.body.observacion,
          tipoMantenimiento: 2
        });
        let consulta2 = `
          select id_proceso from procesomantenimiento order by id_proceso desc limit 1;
          `;
        sequelize
          .query(consulta2, {
            type: sequelize.QueryTypes.SELECT,
          })
          .then(idupdate => {
            console.log("llegó");
            models.serviciomantenimiento.create({
              id_auto: event.body.id_auto,
              id_mecanico: 550,
              tipo_movilizacion: 0,
              fecha_pedido: event.body.fecha_pedido,
              precio_total: 28.20,
              id_horario: 4,
              id_proceso_inicial: idupdate[0].id_proceso + 1
            });
            // res.send(idupdate);
            const response = {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: idupdate }),
            };
            return response;
          });

      } else {

        idprincipal = anterior[0].id_proceso_siguiente;
        models.procesomantenimiento.create({
          fecha_actual: event.body.fecha,
          hora_actual: event.body.hora,
          observacion_mecanico: event.body.observacion,
          tipoMantenimiento: 2,
          id_proceso_anterior: idprincipal,
        });

        let consulta2 = `
      select id_proceso from procesomantenimiento order by id_proceso desc limit 1;
      `;
        sequelize
          .query(consulta2, {
            type: sequelize.QueryTypes.SELECT,
          })
          .then(idupdate => {
            console.log("llegó");
            models.procesomantenimiento.update(
              {
                id_proceso_siguiente: idupdate[0].id_proceso + 1,
              },
              {
                where: { id_proceso: idprincipal },
              }
            );
            const response = {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: idupdate }),
            };
            return response;
          });
      }

    })
    .catch(err =>{
        console.error(err);
        const response = {
            statusCode: 500,
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
