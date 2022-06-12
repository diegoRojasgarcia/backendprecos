"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _patientAPI = _interopRequireDefault(require("../middleware/patientAPI.js"));

var _helpers = _interopRequireDefault(require("../helpers/helpers.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);

  if ('OPTIONS' == req.method) {
    res.sendStatus(200, '');
  } else {
    next();
  }
});
router.post("/RegisterPatient", _helpers["default"].isAutenticated, _patientAPI["default"].RegisterPatient);
router.put("/UpdatePatient", _helpers["default"].isAutenticated, _patientAPI["default"].UpdatePatient);
router.post("/GetPatientById", _helpers["default"].isAutenticated, _patientAPI["default"].getPatientById);
router.get("/GetPatients", _helpers["default"].isAutenticated, _patientAPI["default"].getPatients);
router.post("/GetPatientsByRut", _helpers["default"].isAutenticated, _patientAPI["default"].getPatientsByRut);
router.post("/GetPatientsCancerByRut", _helpers["default"].isAutenticated, _patientAPI["default"].getPatientsCancerByRut);
router["delete"]("/deleteAllForPatient", _helpers["default"].isAutenticated, _patientAPI["default"].deleteAllForPatient);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;