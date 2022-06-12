import Express from 'express';
import db from '../middleware/patientAPI.js';
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

router.post("/RegisterPatient", helpers.isAutenticated,db.RegisterPatient);
router.put("/UpdatePatient", helpers.isAutenticated,db.UpdatePatient);
router.post("/GetPatientById", helpers.isAutenticated,db.getPatientById);
router.get("/GetPatients", helpers.isAutenticated,db.getPatients);
router.post("/GetPatientsByRut", helpers.isAutenticated,db.getPatientsByRut);
router.post("/GetPatientsCancerByRut", helpers.isAutenticated,db.getPatientsCancerByRut);
router.delete("/deleteAllForPatient", helpers.isAutenticated,db.deleteAllForPatient);



router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;