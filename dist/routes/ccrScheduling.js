"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ccrSchedulingAPI = _interopRequireDefault(require("../middleware/ccrSchedulingAPI.js"));

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
router.post("/RegisterSchedule", _helpers["default"].isAutenticated, _ccrSchedulingAPI["default"].RegisterSchedule);
router.put("/UpdateSchedule", _helpers["default"].isAutenticated, _ccrSchedulingAPI["default"].UpdateSchedule);
router.get("/GetScheduleCCR", _helpers["default"].isAutenticated, _ccrSchedulingAPI["default"].GetScheduleCCR);
router.post("/GetScheduleRangeCCR", _helpers["default"].isAutenticated, _ccrSchedulingAPI["default"].GetScheduleRangeCCR);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;