"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _administrativeAPI = _interopRequireDefault(require("../middleware/administrativeAPI.js"));

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
}); //Administrative user

router.get("/GetProfession", _helpers["default"].isAutenticated, _administrativeAPI["default"].getProfession);
router.get("/GetPrivilege", _helpers["default"].isAutenticated, _administrativeAPI["default"].getPrivilege);
router.get("/GetSpecialization", _helpers["default"].isAutenticated, _administrativeAPI["default"].getSpecialization); //Adminstrative patient

router.get("/getRegion", _helpers["default"].isAutenticated, _administrativeAPI["default"].getRegion);
router.post("/getCommuneByRegion", _helpers["default"].isAutenticated, _administrativeAPI["default"].getCommuneByRegion);
router.get("/GetNationality", _helpers["default"].isAutenticated, _administrativeAPI["default"].getNationality);
router.get("/GetFonasa", _helpers["default"].isAutenticated, _administrativeAPI["default"].getFonasa);
router.get("/GetMaritalStatus", _helpers["default"].isAutenticated, _administrativeAPI["default"].getMaritalStatus);
router.get("/GetCesfam", _helpers["default"].isAutenticated, _administrativeAPI["default"].getCesfam); //Administrative survey

router.get("/GetSurveyCCR", _helpers["default"].isAutenticated, _administrativeAPI["default"].getSurveyCCR);
router.get("/GetSurveyCBP", _helpers["default"].isAutenticated, _administrativeAPI["default"].getSurveyCBP); //Administrative ccb

router.get("/GetBiopsyType", _helpers["default"].isAutenticated, _administrativeAPI["default"].getBiopsyType);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;