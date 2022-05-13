import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import connection from './postgresConnection.js';
import config from '../config.json';
import { exec } from 'child_process';


const authFunction = {};

const generateToken = (rut, nombre , privilegio, id_user,idSpeciality) => { //genera un token con el metodo de la libreria jwt, recibiendo el email y el tipo asignado en el front del login
    return jwt.sign({
        Rut: rut,
        Name: nombre,
        Privilege: privilegio,
        Id_User: id_user,
        idSpeciality: idSpeciality
        },
        config.secretToken, {
            expiresIn: '2h'
        }
    )
}
authFunction.login = (req, res) => { //verifica si existe el usuario que se ingreso en el login, en caso de no estar, retorna el error, en caso de estar, entra a la evaluacion del tipo de usuario asignado
    try {
        var Rut=req.body.rut;
        var Contra = req.body.password;
        connection.oneOrNone(`SELECT *
                              FROM client u 
                              WHERE u.rut = $1`, Rut)
            .then(user => {
                crypto.pbkdf2(Contra, user.passwordSalt, 1000, 64, 'sha1', (err, key) => {
                    const encryptPass = key.toString('base64');
                    if (user.passwordHash === encryptPass) {
                        var token = generateToken(user.rut, user.name, user.privilege, user.idUser, user.id_speciality);
                        var id_user = user.idUser;
                        var nombre= user.name;
                        var privilege= user.privilege;
                        var idSpeciality= user.idSpeciality;
                        res.cookie('auth', token);
                        return res.status(200).json({
                            token: token,
                            idUser: id_user,
                            privilege: privilege,
                            idSpeciality: idSpeciality,
                            name: nombre,
                            msg: 'Sesión iniciada exitosamente'
                        })
                    } else {
                        return res.status(400).json({
                            msg: 'El rut o contraseña ingresados no son válidos',
                        })
                    }
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: "Usuario no encontrado",
                    error
                });
            })
    } catch (error) {
        res.status(500).json({
            msg: "Error del sistema",
            error
        });
    }
}
export default authFunction;