"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ccrAPI = _interopRequireDefault(require("../middleware/ccrAPI.js"));

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
}); //patient

router.get("/GetListPatinetCCRForExport", _helpers["default"].isAutenticated, _ccrAPI["default"].getListPatientCcrForReports);

//

router.get("/GetListPatientCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].getListPatientCcr);
router.post("/GetPatientCCRById", _helpers["default"].isAutenticated, _ccrAPI["default"].getPatientCCRById);
router.put("/UpdatePatientCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdatePatientCCR); //enrollment surver

router.post("/RegisterEnrollmentSurveyCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterEnrollmentSurveyCCR);
router.put("/UpdateEnrollmentSurveyCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateEnrollmentSurveyCCR);
router.get("/GetListEnrollmentSurveyCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].getListEnrollmentSurveyCCR);
router.post("/GetEnrollmentSurveyByIdCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].getEnrollmentSurveyCCRByPatient); //risk survey

router.post("/RegisterRiskSurveyBasic", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterRiskSurveyBasic);
router.put("/UpdateRiskSurveyBasic", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateRiskSurveyBasic);
router.post("/RegisterRiskSurveyPathologies", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterRiskSurveyPathologies);
router.put("/UpdateRiskSurveyPathologies", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateRiskSurveyPathologies);
router.post("/RegisterRiskSurveyHabits", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterRiskSurveyHabits);
router.put("/UpdateRiskSurveyHabits", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateRiskSurveyHabits);
router.post("/RegisterRiskSurveyFamily", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterRiskSurveyFamily);
router.put("/UpdateRiskSurveyFamily", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateRiskSurveyFamily);
router.post("/RegisterRiskSurveyFamilyCancer", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterRiskSurveyFamilyCancer);
router.put("/UpdateRiskSurveyFamilyCancer", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateRiskSurveyFamilyCancer);
router.post("/GetRiskSurveyBasicById", _helpers["default"].isAutenticated, _ccrAPI["default"].getRiskSurveyBasicByPatient);
router.post("/GetRiskSurveyPathologiesById", _helpers["default"].isAutenticated, _ccrAPI["default"].getRiskSurveyPathologiesByPatient);
router.post("/GetRiskSurveyHabitsById", _helpers["default"].isAutenticated, _ccrAPI["default"].getRiskSurveyHabitsByPatient);
router.post("/GetRiskSurveyFamilyById", _helpers["default"].isAutenticated, _ccrAPI["default"].getRiskSurveyFamilyByPatient);
router.post("/GetRiskSurveyFamilyCancerById", _helpers["default"].isAutenticated, _ccrAPI["default"].getRiskSurveyFamilyCancerByPatient);
router["delete"]("/familyDelete", _helpers["default"].isAutenticated, _ccrAPI["default"].familyDelete); //Exams

router.post("/RegisterColoncheck", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterColoncheck);
router.post("/GetListColoncheckById", _helpers["default"].isAutenticated, _ccrAPI["default"].getListColoncheckById);
router.post("/RegisterColonoscopy", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterColonoscopy);
router.post("/GetListColonoscopyById", _helpers["default"].isAutenticated, _ccrAPI["default"].getListColonoscopyById);
router.post("/RegisterBiopsyCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].RegisterBiopsyCCR);
router.post("/GetBiopsyByIdCCR", _helpers["default"].isAutenticated, _ccrAPI["default"].getBiopsyByIdCCR);
router["delete"]("/biopsyCCRDelete", _helpers["default"].isAutenticated, _ccrAPI["default"].biopsyCCRDelete);
router["delete"]("/coloncheckDelete", _helpers["default"].isAutenticated, _ccrAPI["default"].coloncheckDelete);
router["delete"]("/colonoscopyDelete", _helpers["default"].isAutenticated, _ccrAPI["default"].colonoscopyDelete); //Tracking

router.put("/UpdateScheduleContactOverdue", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateScheduleContactOverdue);
router.put("/UpdateScheduleContactTracking", _helpers["default"].isAutenticated, _ccrAPI["default"].UpdateScheduleContactTracking);
router.get("/GetScheduleOverdue", _helpers["default"].isAutenticated, _ccrAPI["default"].GetScheduleOverdue);
router.get("/GetScheduleTracking", _helpers["default"].isAutenticated, _ccrAPI["default"].GetScheduleTracking);
router.all('*', function (req, res) {
  res.status(404).json({
    message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.'
  });
});
var _default = router;
exports["default"] = _default;