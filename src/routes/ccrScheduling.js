import Express from 'express';
import db from '../middleware/ccrSchedulingAPI.js';
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
router.put("/UpdateSchedule", helpers.isAutenticated, db.UpdateSchedule);
router.get("/GetScheduleCCR", helpers.isAutenticated,db.GetScheduleCCR);
router.post("/GetScheduleRangeCCR",helpers.isAutenticated,db.GetScheduleRangeCCR);



router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});
export default router;