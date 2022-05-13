"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _postgresConnection = _interopRequireDefault(require("./postgresConnection.js"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var functionQueries = {};

functionQueries.RegisterUser = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var Name = req.body.name;
  var Rut = req.body.rut;
  var Password = req.body.password;
  var Privilege = req.body.privilege;
  var Foundation = req.body.foundation;
  var Profesion = req.body.profession;
  var idSpeciality = req.body.idSpeciality;
  var Access = req.body.access;

  if (Access == null) {
    Access = '1';
  }

  if (idSpeciality == '') {
    idSpeciality = 'ALL';
  }

  _crypto["default"].randomBytes(16, function (err, salt) {
    if (err) {
      return res.status(400).json({
        err: err,
        msg: 'error1'
      });
    }

    var newSalt = salt.toString('base64');

    _crypto["default"].pbkdf2(Password, newSalt, 1000, 64, 'sha1', function (err, key) {
      if (err) {
        return res.status(400).json({
          err: err,
          msg: 'error2'
        });
      }

      var encryptPass = key.toString('base64');

      _postgresConnection["default"].tx(function (t) {
        return t.any("insert into client(name, rut, password_hash, password_salt, profession, privilege, foundation, id_speciality,  access) VALUES ( $1 , $2 , $3 , $4 , $5,$6, $7, $8, $9) RETURNING id_user", [Name, Rut, encryptPass, newSalt, Profesion, Privilege, Foundation, idSpeciality, Access]);
      }).then(function (data) {
        res.status(200).json({
          data: data,
          msg: "Se ha ingresado un usuario"
        });
      })["catch"](function (err) {
        res.status(500).json({
          err: err,
          msg: "Ha ocurrido un error"
        });
      });
    });
  });
};

functionQueries.getUsers = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT id_user, rut, name, profession, id_speciality, privilege, foundation, access FROM client ");
  }).then(function (data) {
    res.status(200).json({
      data: data
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.getUser = function (req, res) {
  //query encargada de obtener al usuario
  var Rut = req.body.rut;

  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT id_user, rut, name, profession, id_speciality, privilege, foundation, access FROM client WHERE rut=$1", [Rut]);
  }).then(function (data) {
    res.status(200).json({
      data: data
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.getUserById = function (req, res) {
  //query encargada de obtener al usuario
  var Id_User = req.body.idUser;

  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT id_user, rut, name,  profession, id_speciality, privilege, foundation, access FROM client WHERE id_user=$1", [Id_User]);
  }).then(function (data) {
    res.status(200).json({
      data: data
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.UpdateUser = function (req, res, next) {
  //query encargada de editar los usuarios
  var Name = req.body.name;
  var Rut = req.body.rut;
  var Password = "";
  var Password = req.body.password;
  var Privilege = req.body.privilege;
  var Foundation = req.body.foundation;
  var Profesion = req.body.profession;
  var idSpeciality = req.body.idSpeciality;
  var Access = req.body.access;
  var Id_User = req.body.idUser;

  if (Access == null) {
    Access = '1';
  }

  if (idSpeciality == '') {
    idSpeciality = 'ALL';
  }

  if (Password != undefined && Password != "") {
    _crypto["default"].randomBytes(16, function (err, salt) {
      if (err) {
        return res.status(400).json({
          err: err,
          msg: 'error1'
        });
      }

      var newSalt = salt.toString('base64');

      _crypto["default"].pbkdf2(Password, newSalt, 1000, 64, 'sha1', function (err, key) {
        if (err) {
          return res.status(400).json({
            err: err,
            msg: 'error2'
          });
        }

        var encryptPass = key.toString('base64');

        _postgresConnection["default"].tx(function (t) {
          return t.none("UPDATE client set rut=$1, name=$2, password_hash=$3, password_salt=$4, profession=$5, id_speciality=$6, privilege=$7, foundation=$8, access=$9 WHERE id_user=$10", [Rut, Name, encryptPass, newSalt, Profesion, idSpeciality, Privilege, Foundation, Access, Id_User]);
        }).then(function (data) {
          res.status(200).json({
            msg: "Se ha actualizado un usuario"
          });
        })["catch"](function (err) {
          res.status(500).json({
            err: err,
            msg: "Ha ocurrido un error"
          });
        });
      });
    });
  } else {
    _postgresConnection["default"].tx(function (t) {
      return t.none("UPDATE client set rut=$1, name=$2, profession=$3, id_speciality=$4, privilege=$5, foundation=$6, access=$7 WHERE id_user=$8", [Rut, Name, Profesion, idSpeciality, Privilege, Foundation, Access, Id_User]);
    }).then(function (data) {
      res.status(200).json({
        msg: "Se ha actualizado un usuario"
      });
    })["catch"](function (err) {
      res.status(500).json({
        err: err,
        msg: "Ha ocurrido un error"
      });
    });
  }
};

var _default = functionQueries;
exports["default"] = _default;