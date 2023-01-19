
const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
require('dotenv').config();

exports.handler = async function (event) {
    event.body = JSON.parse(event.body);
    models.login
    .findAll({
      include: [
        {
          model: models.usuarios,
          as: "usuario",
          where: { correo: event.body.email },
        },
      ],
      where: { correo: event.body.email, contrasenia: event.body.password },
    })
    .then(user => {
      if (user) {
        console.log(user);
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: user[0]["usuario"]["rol"]}),
          };
        return response;
      } else {
        throw err;
      }
    })
    .catch(err => {
      console.log(err)
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data: "Usuario no encontrado", error: err}),
      };
    return response;
    });
}