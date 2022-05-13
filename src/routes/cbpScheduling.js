import Express from 'express';
import db from '../middleware/cbpSchedulingAPI.js';
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

router.post("/RegisterSchedule", helpers.isAutenticated, db.RegisterSchedule);
router.get("/GetScheduleCBP", helpers.isAutenticated,db.GetScheduleCBP);
router.post("/GetScheduleRangeCBP",helpers.isAutenticated,db.GetScheduleRangeCBP);
router.put("/UpdateSchedule", helpers.isAutenticated, db.UpdateSchedule);




router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;