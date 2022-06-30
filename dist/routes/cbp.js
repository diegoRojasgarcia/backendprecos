"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cbpAPI = _interopRequireDefault(require("../middleware/cbpAPI.js"));

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
}); //Patient

router.get("/GetListPatientCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].getListPatientCBP);
router.get("/GetListPatientCBPReports", _helpers["default"].isAutenticated, _cbpAPI["default"].getListPatientCbpForReports);
router.get("/GetListPatientCBPStatistics", _helpers["default"].isAutenticated, _cbpAPI["default"].getListPatientCbpForstatistics);
router.post("/GetPatientCBPById", _helpers["default"].isAutenticated, _cbpAPI["default"].getPatientCBPById);
router.get("/GetListTAC0", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC0);
router.get("/GetListTAC1", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC1);
router.get("/GetListTAC2", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC2);
router.get("/GetListTAC3", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC3);
router.get("/GetListTAC4A", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC4A);
router.get("/GetListTAC4B", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC4B);
router.get("/GetListTAC4S", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC4S);
router.put("/UpdatePatientCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdatePatientCBP); //Survey enrollment

router.post("/RegisterEnrollmentSurveyCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterEnrollmentSurveyCBP);
router.put("/UpdateEnrollmentSurveyCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateEnrollmentSurveyCBP);
router.get("/GetListEnrollmentSurveyCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].getListEnrollmentSurveyCBP);
router.post("/GetEnrollmentSurveyByIdCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].getEnrollmentSurveyCBPByPatient); //Exams

router.post("/RegisterTAC", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterLDCT);
router.post("/GetListTACById", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTACById);
router.get("/GetListTAC", _helpers["default"].isAutenticated, _cbpAPI["default"].getListTAC);
router["delete"]("/ldctDelete", _helpers["default"].isAutenticated, _cbpAPI["default"].ldctDelete);
router.post("/RegisterBiopsyCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterBiopsyCBP);
router.post("/GetBiopsyByIdCBP", _helpers["default"].isAutenticated, _cbpAPI["default"].getBiopsyByIdCBP);
router["delete"]("/biopsyCBPDelete", _helpers["default"].isAutenticated, _cbpAPI["default"].biopsyCBPDelete); //Tracking

router.get("/GetScheduleTrackingLungRADS", _helpers["default"].isAutenticated, _cbpAPI["default"].GetScheduleTrackingLungRADS);
router.put("/UpdateContactLungRads", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateContactLungRads); //risk survey

router.post("/RegisterRiskSurveyBasic", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterRiskSurveyBasic);
router.put("/UpdateRiskSurveyBasic", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateRiskSurveyBasic);
router.post("/GetRiskSurveyBasicById", _helpers["default"].isAutenticated, _cbpAPI["default"].getRiskSurveyBasicByPatient);
router.post("/GetRiskSurveyPathologiesById", _helpers["default"].isAutenticated, _cbpAPI["default"].getRiskSurveyPathologiesByPatient);
router.post("/RegisterRiskSurveyPathologies", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterRiskSurveyPathologies);
router.put("/UpdateRiskSurveyPathologies", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateRiskSurveyPathologies);
router.post("/GetRiskSurveyHabitsById", _helpers["default"].isAutenticated, _cbpAPI["default"].getRiskSurveyHabitsByPatient);
router.post("/RegisterRiskSurveyHabits", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterRiskSurveyHabits);
router.put("/UpdateRiskSurveyHabits", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateRiskSurveyHabits);
router.post("/GetRiskSurveyFamilyById", _helpers["default"].isAutenticated, _cbpAPI["default"].getRiskSurveyFamilyByPatient);
router.post("/RegisterRiskSurveyFamily", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterRiskSurveyFamily);
router.put("/UpdateRiskSurveyFamily", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateRiskSurveyFamily);
router.post("/RegisterRiskSurveyFamilyCancer", _helpers["default"].isAutenticated, _cbpAPI["default"].RegisterRiskSurveyFamilyCancer);
router.put("/UpdateRiskSurveyFamilyCancer", _helpers["default"].isAutenticated, _cbpAPI["default"].UpdateRiskSurveyFamilyCancer);
router.post("/GetRiskSurveyFamilyCancerById", _helpers["default"].isAutenticated, _cbpAPI["default"].getRiskSurveyFamilyCancerByPatient);
router["delete"]("/familyDelete", _helpers["default"].isAutenticated, _cbpAPI["default"].familyDelete);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;