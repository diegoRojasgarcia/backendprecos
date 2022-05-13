"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _pgPromise = _interopRequireDefault(require("pg-promise"));

var _config = _interopRequireDefault(require("../config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionConf = {
  host: 'ec2-54-208-96-16.compute-1.amazonaws.com',
  port: 5432,
  database: 'd6b25go37c572r',
  user: 'wmshsjzyzgadzl',
  password: '71434d4110e581018f50e1dd3927d0cb45ed02aec05aa9384f2ccb77db9e258c',
  ssl: {
    rejectUnauthorized: false
  }
};

var camelizeColumns = function camelizeColumns(data) {
  var template = data[0];

  for (var prop in template) {
    var camel = _pgPromise["default"].utils.camelize(prop);

    if (!(camel in template)) {
      for (var i = 0; i < data.length; i++) {
        var d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

var postgres = (0, _pgPromise["default"])({
  promiseLib: _bluebird["default"],
  receive: function receive(data, result, e) {
    camelizeColumns(data);
  }
});
var connection = postgres(connectionConf);
var _default = connection;
exports["default"] = _default;