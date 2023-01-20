const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    event.body = JSON.parse(event.body);

    models.login.create({
        correo: event.body.correo,
        contrasenia: event.body.contrasenia,
      });
    
    models.ubicacion
    .create({
        provincia: event.body.provincia,
        ciudad: event.body.ciudad,
        referencia: event.body.referencia,
    })
    .then(response => {
        models.usuarios.create({
        cedula: event.body.cedula,
        nombres: event.body.nombre,
        apellidos: event.body.apellido,
        fecha_nacimiento: event.body.fecha,
        foto: "",
        celular: event.body.celular,
        rol: event.body.rol,
        correo: event.body.correo,
        ubicacion: response.dataValues.id_ubicacion,
        });
    })
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
}