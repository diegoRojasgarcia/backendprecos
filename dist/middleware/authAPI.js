"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _postgresConnection = _interopRequireDefault(require("./postgresConnection.js"));

var _config = _interopRequireDefault(require("../config.json"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authFunction = {};

var generateToken = function generateToken(rut, nombre, privilegio, id_user, idSpeciality) {
  //genera un token con el metodo de la libreria jwt, recibiendo el email y el tipo asignado en el front del login
  return _jsonwebtoken["default"].sign({
    Rut: rut,
    Name: nombre,
    Privilege: privilegio,
    Id_User: id_user,
    idSpeciality: idSpeciality
  }, _config["default"].secretToken, {
    expiresIn: '2h'
  });
};

authFunction.login = function (req, res) {
  //verifica si existe el usuario que se ingreso en el login, en caso de no estar, retorna el error, en caso de estar, entra a la evaluacion del tipo de usuario asignado
  try {
    var Rut = req.body.rut;
    var Contra = req.body.password;

    _postgresConnection["default"].oneOrNone("SELECT *\n                              FROM client u \n                              WHERE u.rut = $1", Rut).then(function (user) {
      _crypto["default"].pbkdf2(Contra, user.passwordSalt, 1000, 64, 'sha1', function (err, key) {
        var encryptPass = key.toString('base64');

        if (user.passwordHash === encryptPass) {
          var token = generateToken(user.rut, user.name, user.privilege, user.idUser, user.id_speciality);
          var id_user = user.idUser;
          var nombre = user.name;
          var privilege = user.privilege;
          var idSpeciality = user.idSpeciality;
          res.cookie('auth', token);
          return res.status(200).json({
            token: token,
            idUser: id_user,
            privilege: privilege,
            idSpeciality: idSpeciality,
            name: nombre,
            msg: 'Sesión iniciada exitosamente'
          });
        } else {
          return res.status(400).json({
            msg: 'El rut o contraseña ingresados no son válidos'
          });
        }
      });
    })["catch"](function (error) {
      res.status(500).json({
        msg: "Usuario no encontrado",
        error: error
      });
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del sistema",
      error: error
    });
  }
};

var _default = authFunction;
exports["default"] = _default;