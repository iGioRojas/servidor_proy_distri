const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.handler = async function (event){
    event.body = JSON.parse(event.body);
    models.update(
        {
          titulo: event.body.titulo,
          descripcion: event.body.descripcion,
          precio: event.body.precio,
        },
        { where: { id_promocion: event.body.id } }
      ).then(reponseQuery =>{
        const response = {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: responseQuery}),
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