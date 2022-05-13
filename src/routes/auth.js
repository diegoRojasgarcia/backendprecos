import Express from 'express';
import authFunction from '../middleware/authAPI.js';
import connection from '../middleware/postgresConnection.js';
import crypto from 'crypto';


const router = new Express.Router();
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

router.post('/login', authFunction.login);

router.get('/logout', (req, res) => { // funcion para deslogear al usuario
    res.cookie('auth', null);
    res.redirect('/');
});

router.get('/register', (req, res) => { //función para registrar al usuario que será coordinador en el sistema, se debe ejecutar una unica vez, y luego no se modifica más.
    crypto.randomBytes(16, (err, salt) => {
        if (err) {
            return res.status(400).json({
                err,
                msg: 'error1'
            })
        }
        const newSalt = salt.toString('base64');
        crypto.pbkdf2('admin2021', newSalt, 1000, 64, 'sha1', (err, key) => {
            if (err) {
                return res.status(400).json({
                    err,
                    msg: 'error2'
                })
            }
            const encryptPass = key.toString('base64');
            connection.none("INSERT INTO client(rut,name,password_hash,password_salt,profession, specialization, privilege, foundation, access) VALUES('999999999','Administrador','".concat(encryptPass, "','").concat(newSalt, "','1','Admministrador', '1','1','1')"))
            .then(function () {
                return res.status(200).json({
                  msg: 'usuario registrado'
                });
              }).catch(err => {
                    return res.status(400).json({
                        err,
                        msg: 'error4'
                    })
                })
        })

    })
});

export default router;