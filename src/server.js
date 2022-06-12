import express from 'express';
import path from 'path';
import userRoutes from './routes/user.js';
import patientRoutes from './routes/patient.js';
import ccrRoutes from './routes/ccr.js';
import cbpRoutes from './routes/cbp.js';
import ccrSchedulingRoutes from './routes/ccrScheduling.js';
import cbpSchedulingRoutes from './routes/cbpScheduling.js';
import administrativeAPI from './routes/administrative.js';


import BodyParser from 'body-parser';
import MethodOverride from 'method-override';
import authRoutes from './routes/auth.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import Swal from 'sweetalert2';


const __dirname = path.resolve();



//importaciones de librerias, para poder usar la importacion de es6, se requiere la configuracion de babel que se encuentra en el archivo .babelrc
// en caso contrario se deberan importar con la siguiente sintaxia --> const express = requiere('express');

const app = express(); // iniciar un servidor con express


//inicio de configuraciones de los middlewares para la app
app.set('view engine', 'ejs'); // esto le permite qal servidor entender vistas con formato ejs
app.set('views', path.join(__dirname, 'views')); // esto es para definir la carpeta donde el servidor debe buscar las vistas
app.use(express.static(path.join(__dirname, 'static'))); // lo mismo que la vistas pero con los archivos estaticos
//app.use(express.static(path.join(__dirname, '/'))); // lo mismo que la vistas pero con los archivos estaticos
app.use(MethodOverride());
app.use(BodyParser.json()); // esto con el anterior permiten que las vistas puedan enviarle datos al servidor con formato json y no acepte archivo multimedias como tales
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));


//---- aqui van las vistas, pueden estar todas aqui o bien importar de un archivo aparte para que no queden feas

//--- fin de las vistas

app.use(`/auth`, authRoutes); // api para funciones de autenciación
/* app.use(`/api`, helpersFunctions.isAutenticated, apiRoutes); */ // api privada para utilizarla un usuario debe estar loageado
//app.use(`/api`, isAuthenticated, apiRoutes); // api privada para utilizarla un usuario debe estar loageado
app.use(`/userAPI`, userRoutes);

app.use(`/patientAPI`, patientRoutes);

app.use(`/ccrAPI`, ccrRoutes);

app.use(`/cbpAPI`, cbpRoutes);

app.use(`/ccrSchedulingAPI`, ccrSchedulingRoutes);

app.use(`/cbpSchedulingAPI`, cbpSchedulingRoutes);

app.use(`/administrativeAPI`, administrativeAPI);


let port =  3000; // definicion del puerto

if (process.env.PORT) port = process.env.PORT; // si el sistema esta en producción se le asigna el puerto dado por el servidor, si no se queda con el 3000

app.listen(port, () => { // iniciar la aplicación en el puerto dado
    console.log(`El servidor está escuchando en el puerto ${port}`);
}); 