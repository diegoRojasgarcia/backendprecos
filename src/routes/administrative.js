import Express from 'express';
import db from '../middleware/administrativeAPI.js';
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
//Administrative user
router.get("/GetProfession", helpers.isAutenticated, db.getProfession);
router.get("/GetPrivilege", helpers.isAutenticated, db.getPrivilege);
router.get("/GetSpecialization", helpers.isAutenticated, db.getSpecialization);

//Adminstrative patient
router.get("/getRegion", helpers.isAutenticated,db.getRegion);
router.post("/getCommuneByRegion", helpers.isAutenticated,db.getCommuneByRegion);
router.get("/GetNationality", helpers.isAutenticated, db.getNationality);
router.get("/GetFonasa", helpers.isAutenticated, db.getFonasa);
router.get("/GetMaritalStatus", helpers.isAutenticated, db.getMaritalStatus);
router.get("/GetCesfam", helpers.isAutenticated, db.getCesfam);
router.get("/GetPActivity", helpers.isAutenticated, db.getPActivity);
router.get("/GetAlcohol", helpers.isAutenticated, db.getAlcohol);

//Administrative survey
router.get("/GetSurveyCCR", helpers.isAutenticated,db.getSurveyCCR);
router.get("/GetSurveyCBP", helpers.isAutenticated,db.getSurveyCBP);

//Administrative ccb
router.get("/GetBiopsyType", helpers.isAutenticated, db.getBiopsyType);




router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;