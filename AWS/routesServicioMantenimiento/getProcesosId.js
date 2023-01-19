
const sequelize = require("../models/index.js").sequelize;
const autos = require("../models/autos.js");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function(event) {
  const idAuto = event["pathParameters"]["id_auto"];
  let consulta = `SELECT id_auto, GENERALT.id_proceso_siguiente, fecha_actual, hora_actual, observacion_mecanico, CONCAT(U.NOMBRES,' ',U.APELLIDOS) mecanico FROM 
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
  WHERE id_auto = ${idAuto}
  ORDER BY INICIO`;
  sequelize
    .query(consulta, {
      type: sequelize.QueryTypes.SELECT,
    })
    .then(procesos => {

        console.log(procesos);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: procesos}),
          };
          return response;
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
