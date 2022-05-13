"use strict";

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _crypto = _interopRequireDefault(require("crypto"));

var _postgresConnection = _interopRequireDefault(require("../middleware/postgresConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Funcionalidad encargada de asignar las vistas necesarias, obteniendo a su vez los tipos que pueden acceder a las rutas indicadas en caso de tener restricciones.
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('Login');
  });
};