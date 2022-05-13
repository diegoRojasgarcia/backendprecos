"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _validator = _interopRequireDefault(require("validator"));

var _moment = _interopRequireDefault(require("moment"));

var _postgresConnection = _interopRequireDefault(require("./postgresConnection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// archivo para separar las validaciones que se enviaran al servidor, idealmente esto debe ejecutarse antes de pasar a la db
var validationFunctions = {};

validationFunctions.registerUser = function (req, res, next) {
  var body = req.body;

  if (body.rut == null || body.rut == "") {
    return res.status(500).json({
      msg: 'Ingrese un rut válido'
    });
  }

  if (body.password == null || body.password == "") {
    return res.status(500).json({
      msg: 'Ingrese una contraseña válida'
    });
  }

  _postgresConnection["default"].any("SELECT * FROM client WHERE rut = $1 ", [body.rut]).then(function (user) {
    if (user.length != 0) {
      return res.status(500).json({
        msg: "Rut ya registrado"
      });
    } else {
      next();
    }
  });
};

validationFunctions.editUser = function (req, res, next) {
  var body = req.body;

  if (body.rut == null || body.rut == "") {
    return res.status(500).json({
      msg: 'Ingrese un rut válido'
    });
  }
};

var _default = validationFunctions;
exports["default"] = _default;