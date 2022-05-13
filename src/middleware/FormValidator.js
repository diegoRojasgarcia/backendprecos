// archivo para separar las validaciones que se enviaran al servidor, idealmente esto debe ejecutarse antes de pasar a la db
import empty from 'is-empty';
import validator from 'validator';
import moment from 'moment';
import connection from './postgresConnection.js';


const validationFunctions = {};

validationFunctions.registerUser = (req, res, next) => { 
    const body = req.body;

    if (body.rut==null || body.rut=="") { 
        return res.status(500).json({
            msg: 'Ingrese un rut válido'
        })
    }
    if (body.password==null|| body.password=="") { 
        return res.status(500).json({
            msg: 'Ingrese una contraseña válida'
        })
    }

    connection.any("SELECT * FROM client WHERE rut = $1 ", [body.rut]).then((user) => {
        if(user.length!=0){
        return res.status(500).json({
            msg:"Rut ya registrado"
        })
    }
    else{
        next();
    }

    });
}

validationFunctions.editUser = (req, res, next) => { 
    const body = req.body;

    if (body.rut==null || body.rut=="") { 
        return res.status(500).json({
            msg: 'Ingrese un rut válido'
        })
    }

}

export default validationFunctions;