"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authAPI = _interopRequireDefault(require("../middleware/authAPI.js"));

var _postgresConnection = _interopRequireDefault(require("../middleware/postgresConnection.js"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express["default"].Router();
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
router.post('/login', _authAPI["default"].login);
router.get('/logout', function (req, res) {
  // funcion para deslogear al usuario
  res.cookie('auth', null);
  res.redirect('/');
});
router.get('/register', function (req, res) {
  //función para registrar al usuario que será coordinador en el sistema, se debe ejecutar una unica vez, y luego no se modifica más.
  _crypto["default"].randomBytes(16, function (err, salt) {
    if (err) {
      return res.status(400).json({
        err: err,
        msg: 'error1'
      });
    }

    var newSalt = salt.toString('base64');

    _crypto["default"].pbkdf2('admin2021', newSalt, 1000, 64, 'sha1', function (err, key) {
      if (err) {
        return res.status(400).json({
          err: err,
          msg: 'error2'
        });
      }

      var encryptPass = key.toString('base64');

      _postgresConnection["default"].none("INSERT INTO client(rut,name,password_hash,password_salt,profession, specialization, privilege, foundation, access) VALUES('999999999','Administrador','".concat(encryptPass, "','").concat(newSalt, "','1','Admministrador', '1','1','1')")).then(function () {
        return res.status(200).json({
          msg: 'usuario registrado'
        });
      })["catch"](function (err) {
        return res.status(400).json({
          err: err,
          msg: 'error4'
        });
      });
    });
  });
});
var _default = router;
exports["default"] = _default;