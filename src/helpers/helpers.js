import jwt from 'jsonwebtoken';
import config from '../config.json';
import connection from "../middleware/postgresConnection.js";

const helpers = {};

helpers.isAutenticated = (req, res, next) => { //recibe el token generado en authAPI, y evalúa si este existe, o si es correcto
    const token = req.headers.authorization;

    if (!token) { //si el token es invaalido, niega el acceso.
        return res.status(403).json({
            msg: 'Acceso denegado'
        })
    }
    jwt.verify(token, config.secretToken, (err, decoded) => {
        if (err) { //en caso de que el tiempo de vida asignado al token termine, notifica al usuario, esto hecho por motivos de seguridad.
            return res.status(401).json({
                msg: 'La sesión expiró, vuelva a iniciar sesión para continuar.'
            })
        }
        var rut = decoded.Rut;

        connection //query cumpliendo el rol de asignarle al usuario logueado, el ultimo id que posee en el sistema, esto para los casos en que el usuario hubiera reprobado y se encuentre más de una vez en el sistema.
            .one(`SELECT * 
                  FROM client
                  WHERE rut = $1 `, [rut])
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((error) => {
                res.status(500).json({
                    msg: 'Su sesión ha expirado',
                    error,
                });
            });
    })
}

export default helpers;