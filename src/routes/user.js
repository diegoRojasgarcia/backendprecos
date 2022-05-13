import Express from 'express';
import db from '../middleware/userAPI.js';
import helpers from '../helpers/helpers.js';
import formValidator from '../middleware/FormValidator';

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


router.get("/GetListUser", helpers.isAutenticated, db.getUsers);
router.post("/GetUser", helpers.isAutenticated, db.getUser);
router.post("/GetUserId", helpers.isAutenticated, db.getUserById);
router.post("/RegisterUser", helpers.isAutenticated,formValidator.registerUser,db.RegisterUser);
router.put("/UpdateUSer", helpers.isAutenticated,db.UpdateUser);


router.all('*', (req, res) => {
    res.status(404).json({ message: 'La ruta de la solicitud HTTP no es reconocida por el servidor.' });
});

export default router;