import helpersFunctions from "../helpers/helpers";
import crypto from 'crypto';
import connection from '../middleware/postgresConnection';


//Funcionalidad encargada de asignar las vistas necesarias, obteniendo a su vez los tipos que pueden acceder a las rutas indicadas en caso de tener restricciones.
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('Login');
    });

}
