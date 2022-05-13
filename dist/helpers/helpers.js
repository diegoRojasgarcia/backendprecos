"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config.json"));

var _postgresConnection = _interopRequireDefault(require("../middleware/postgresConnection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var helpers = {};

helpers.isAutenticated = function (req, res, next) {
  //recibe el token generado en authAPI, y evalúa si este existe, o si es correcto
  var token = req.headers.authorization;

  if (!token) {
    //si el token es invaalido, niega el acceso.
    return res.status(403).json({
      msg: 'Acceso denegado'
    });
  }

  _jsonwebtoken["default"].verify(token, _config["default"].secretToken, function (err, decoded) {
    if (err) {
      //en caso de que el tiempo de vida asignado al token termine, notifica al usuario, esto hecho por motivos de seguridad.
      return res.status(401).json({
        msg: 'La sesión expiró, vuelva a iniciar sesión para continuar.'
      });
    }

    var rut = decoded.Rut;

    _postgresConnection["default"] //query cumpliendo el rol de asignarle al usuario logueado, el ultimo id que posee en el sistema, esto para los casos en que el usuario hubiera reprobado y se encuentre más de una vez en el sistema.
    .one("SELECT * \n                  FROM client\n                  WHERE rut = $1 ", [rut]).then(function (user) {
      req.user = user;
      next();
    })["catch"](function (error) {
      res.status(500).json({
        msg: 'Su sesión ha expirado',
        error: error
      });
    });
  });
};

var _default = helpers;
exports["default"] = _default;