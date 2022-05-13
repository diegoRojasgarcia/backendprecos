"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _postgresConnection = _interopRequireDefault(require("./postgresConnection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var functionQueries = {}; //Administrative user

functionQueries.getProfession = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT * FROM profession ");
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

functionQueries.getPrivilege = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT * FROM privilege ");
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

functionQueries.getSpecialization = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT * from specialization");
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
}; //Administrative patient


functionQueries.getNationality = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT GENTILICIO_NAC FROM nationality ");
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

functionQueries.getFonasa = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT stretch FROM fonasa ");
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

functionQueries.getMaritalStatus = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT status from maritalStatus");
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

functionQueries.getRegion = function (req, res) {
  //query encargada de obtener al usuario
  var XMLHttpRequest = require('xhr2');

  var xhr = new XMLHttpRequest();
  xhr.open('get', "https://apis.digital.gob.cl/dpa/regiones");
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var data = xhr.response;
      res.status(200).json({
        data: data
      });
    } else {
      res.status(500).json({
        msg: "Ha ocurrido un error"
      });
    }
  });
  xhr.send();
};

functionQueries.getCommuneByRegion = function (req, res) {
  //query encargada de obtener al usuario
  var XMLHttpRequest = require('xhr2');

  var codigo = req.body.codigo;
  var xhr = new XMLHttpRequest();
  xhr.open('get', "https://apis.digital.gob.cl/dpa/regiones/".concat(codigo, "/comunas"));
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var data = xhr.response;
      res.status(200).json({
        data: data
      });
    } else {
      res.status(500).json({
        msg: "Ha ocurrido un error"
      });
    }
  });
  xhr.send();
};

functionQueries.getCesfam = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT cesfam from cesfam");
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
}; //Administrative survey


functionQueries.getSurveyCBP = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT type, msg, name from surveyCBP");
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

functionQueries.getSurveyCCR = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT type, msg, name from surveyCCR");
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
}; //Administrative cbp


functionQueries.getBiopsyType = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT type from biopsyType");
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

var _default = functionQueries;
exports["default"] = _default;