import Express from 'express';
import db from '../middleware/cbpAPI.js';
import helpers from '../helpers/helpers.js';

const router = Express.Router();

router.use((req, res, next) => {
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

//Patient
router.get("/GetListPatientCBP", helpers.isAutenticated,db.getListPatientCBP);
router.get("/GetListPatientCBPReports", helpers.isAutenticated, db.getListPatientCbpForReports);
router.get("/GetListPatientCBPStatistics", helpers.isAutenticated, db.getListPatientCbpForstatistics);
router.post("/GetPatientCBPById", helpers.isAutenticated,db.getPatientCBPById);

router.get("/GetListTAC0", helpers.isAutenticated,db.getListTAC0);
router.get("/GetListTAC1", helpers.isAutenticated,db.getListTAC1);
router.get("/GetListTAC2", helpers.isAutenticated,db.getListTAC2);
router.get("/GetListTAC3", helpers.isAutenticated,db.getListTAC3);
router.get("/GetListTAC4A", helpers.isAutenticated,db.getListTAC4A);
router.get("/GetListTAC4B", helpers.isAutenticated,db.getListTAC4B);
router.get("/GetListTAC4S", helpers.isAutenticated,db.getListTAC4S);
router.put("/UpdatePatientCBP", helpers.isAutenticated,db.UpdatePatientCBP);

//Survey enrollment
router.post("/RegisterEnrollmentSurveyCBP", helpers.isAutenticated,db.RegisterEnrollmentSurveyCBP);
router.put("/UpdateEnrollmentSurveyCBP", helpers.isAutenticated,db.UpdateEnrollmentSurveyCBP);
router.get("/GetListEnrollmentSurveyCBP", helpers.isAutenticated,db.getListEnrollmentSurveyCBP);
router.post("/GetEnrollmentSurveyByIdCBP", helpers.isAutenticated,db.getEnrollmentSurveyCBPByPatient);

//Exams
router.post("/RegisterTAC", helpers.isAutenticated,db.RegisterLDCT);
router.post("/GetListTACById", helpers.isAutenticated,db.getListTACById);
router.get("/GetListTAC", helpers.isAutenticated,db.getListTAC);
router.delete("/ldctDelete", helpers.isAutenticated,db.ldctDelete);
router.post("/RegisterBiopsyCBP", helpers.isAutenticated,db.RegisterBiopsyCBP);
router.post("/GetBiopsyByIdCBP", helpers.isAutenticated,db.getBiopsyByIdCBP);
router.delete("/biopsyCBPDelete", helpers.isAutenticated,db.biopsyCBPDelete);


//Tracking
router.get("/GetScheduleTrackingLungRADS",helpers.isAutenticated,db.GetScheduleTrackingLungRADS);
router.put("/UpdateContactLungRads", helpers.isAutenticated, db.UpdateContactLungRads);


//risk survey
router.post("/RegisterRiskSurveyBasic", helpers.isAutenticated,db.RegisterRiskSurveyBasic);
router.put("/UpdateRiskSurveyBasic", helpers.isAutenticated,db.UpdateRiskSurveyBasic);
router.post("/GetRiskSurveyBasicById", helpers.isAutenticated,db.getRiskSurveyBasicByPatient);

router.post("/GetRiskSurveyPathologiesById", helpers.isAutenticated,db.getRiskSurveyPathologiesByPatient);
router.post("/RegisterRiskSurveyPathologies", helpers.isAutenticated,db.RegisterRiskSurveyPathologies);
router.put("/UpdateRiskSurveyPathologies", helpers.isAutenticated,db.UpdateRiskSurveyPathologies);

router.post("/GetRiskSurveyHabitsById", helpers.isAutenticated,db.getRiskSurveyHabitsByPatient);
router.post("/RegisterRiskSurveyHabits", helpers.isAutenticated,db.RegisterRiskSurveyHabits);
router.put("/UpdateRiskSurveyHabits", helpers.isAutenticated,db.UpdateRiskSurveyHabits);


router.post("/GetRiskSurveyFamilyById", helpers.isAutenticated,db.getRiskSurveyFamilyByPatient);
router.post("/RegisterRiskSurveyFamily", helpers.isAutenticated,db.RegisterRiskSurveyFamily);
router.put("/UpdateRiskSurveyFamily", helpers.isAutenticated,db.UpdateRiskSurveyFamily);


router.post("/RegisterRiskSurveyFamilyCancer", helpers.isAutenticated,db.RegisterRiskSurveyFamilyCancer);
router.put("/UpdateRiskSurveyFamilyCancer", helpers.isAutenticated,db.UpdateRiskSurveyFamilyCancer);
router.post("/GetRiskSurveyFamilyCancerById", helpers.isAutenticated,db.getRiskSurveyFamilyCancerByPatient);


router.delete("/familyDelete", helpers.isAutenticated,db.familyDelete);
router.get("/GetAlcohol", helpers.isAutenticated, db.getAlcohol);



router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;