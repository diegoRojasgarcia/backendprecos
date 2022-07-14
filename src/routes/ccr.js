import Express from 'express';
import db from '../middleware/ccrAPI.js';
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

//patient
router.get("/GetListPatientCCRForExport", helpers.isAutenticated,db.getListPatientCcrForReports);
//

router.get("/GetListPatientCCR", helpers.isAutenticated,db.getListPatientCcr);
router.post("/GetPatientCCRById", helpers.isAutenticated,db.getPatientCCRById);
router.put("/UpdatePatientCCR", helpers.isAutenticated,db.UpdatePatientCCR);

//enrollment surver
router.post("/RegisterEnrollmentSurveyCCR", helpers.isAutenticated,db.RegisterEnrollmentSurveyCCR);
router.put("/UpdateEnrollmentSurveyCCR", helpers.isAutenticated,db.UpdateEnrollmentSurveyCCR);
router.get("/GetListEnrollmentSurveyCCR", helpers.isAutenticated,db.getListEnrollmentSurveyCCR);
router.post("/GetEnrollmentSurveyByIdCCR", helpers.isAutenticated,db.getEnrollmentSurveyCCRByPatient);

//risk survey
router.post("/GetRiskSurveyBasicById", helpers.isAutenticated,db.getRiskSurveyBasicByPatient);
router.post("/RegisterRiskSurveyBasic", helpers.isAutenticated,db.RegisterRiskSurveyBasic);
router.put("/UpdateRiskSurveyBasic", helpers.isAutenticated,db.UpdateRiskSurveyBasic);

router.post("/GetRiskSurveyPathologiesById", helpers.isAutenticated,db.getRiskSurveyPathologiesByPatient);
router.post("/RegisterRiskSurveyPathologies", helpers.isAutenticated,db.RegisterRiskSurveyPathologies);
router.put("/UpdateRiskSurveyPathologies", helpers.isAutenticated,db.UpdateRiskSurveyPathologies);

router.post("/GetRiskSurveyHabitsById", helpers.isAutenticated,db.getRiskSurveyHabitsByPatient);
router.post("/RegisterRiskSurveyHabits", helpers.isAutenticated,db.RegisterRiskSurveyHabits);
router.put("/UpdateRiskSurveyHabits", helpers.isAutenticated,db.UpdateRiskSurveyHabits);

router.post("/GetRiskSurveyFamilyById", helpers.isAutenticated,db.getRiskSurveyFamilyByPatient);
router.post("/RegisterRiskSurveyFamily", helpers.isAutenticated,db.RegisterRiskSurveyFamily);
router.put("/UpdateRiskSurveyFamily", helpers.isAutenticated,db.UpdateRiskSurveyFamily);

router.post("/GetRiskSurveyFamilyCancerById", helpers.isAutenticated,db.getRiskSurveyFamilyCancerByPatient);
router.post("/RegisterRiskSurveyFamilyCancer", helpers.isAutenticated,db.RegisterRiskSurveyFamilyCancer);
router.put("/UpdateRiskSurveyFamilyCancer", helpers.isAutenticated,db.UpdateRiskSurveyFamilyCancer);


router.delete("/familyDelete", helpers.isAutenticated,db.familyDelete);


//Exams
router.post("/RegisterColoncheck", helpers.isAutenticated,db.RegisterColoncheck);
router.post("/GetListColoncheckById", helpers.isAutenticated,db.getListColoncheckById);
router.post("/RegisterColonoscopy", helpers.isAutenticated,db.RegisterColonoscopy);
router.post("/GetListColonoscopyById", helpers.isAutenticated,db.getListColonoscopyById);
router.post("/RegisterBiopsyCCR", helpers.isAutenticated,db.RegisterBiopsyCCR);
router.post("/GetBiopsyByIdCCR", helpers.isAutenticated,db.getBiopsyByIdCCR);
router.delete("/biopsyCCRDelete", helpers.isAutenticated,db.biopsyCCRDelete);
router.delete("/coloncheckDelete", helpers.isAutenticated,db.coloncheckDelete);
router.delete("/colonoscopyDelete", helpers.isAutenticated,db.colonoscopyDelete);


//Tracking
router.put("/UpdateScheduleContactOverdue", helpers.isAutenticated, db.UpdateScheduleContactOverdue);
router.put("/UpdateScheduleContactTracking", helpers.isAutenticated, db.UpdateScheduleContactTracking);
router.get("/GetScheduleOverdue",helpers.isAutenticated,db.GetScheduleOverdue);
router.get("/GetScheduleTracking",helpers.isAutenticated,db.GetScheduleTracking);

router.get("/GetAlcohol", helpers.isAutenticated, db.getAlcohol);


router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;