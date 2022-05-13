"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _patient = _interopRequireDefault(require("./routes/patient.js"));

var _ccr = _interopRequireDefault(require("./routes/ccr.js"));

var _cbp = _interopRequireDefault(require("./routes/cbp.js"));

var _ccrScheduling = _interopRequireDefault(require("./routes/ccrScheduling.js"));

var _cbpScheduling = _interopRequireDefault(require("./routes/cbpScheduling.js"));

var _administrative = _interopRequireDefault(require("./routes/administrative.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dirname = _path["default"].resolve(); //importaciones de librerias, para poder usar la importacion de es6, se requiere la configuracion de babel que se encuentra en el archivo .babelrc
// en caso contrario se deberan importar con la siguiente sintaxia --> const express = requiere('express');


var app = (0, _express["default"])(); // iniciar un servidor con express
//inicio de configuraciones de los middlewares para la app

app.set('view engine', 'ejs'); // esto le permite qal servidor entender vistas con formato ejs

app.set('views', _path["default"].join(_dirname, 'views')); // esto es para definir la carpeta donde el servidor debe buscar las vistas

app.use(_express["default"]["static"](_path["default"].join(_dirname, 'static'))); // lo mismo que la vistas pero con los archivos estaticos
//app.use(express.static(path.join(__dirname, '/'))); // lo mismo que la vistas pero con los archivos estaticos

app.use((0, _methodOverride["default"])());
app.use(_bodyParser["default"].json()); // esto con el anterior permiten que las vistas puedan enviarle datos al servidor con formato json y no acepte archivo multimedias como tales

app.use((0, _cookieParser["default"])());
app.use((0, _expressFileupload["default"])({
  createParentPath: true
})); //---- aqui van las vistas, pueden estar todas aqui o bien importar de un archivo aparte para que no queden feas
//--- fin de las vistas

app.use("/auth", _auth["default"]); // api para funciones de autenciación

/* app.use(`/api`, helpersFunctions.isAutenticated, apiRoutes); */
// api privada para utilizarla un usuario debe estar loageado
//app.use(`/api`, isAuthenticated, apiRoutes); // api privada para utilizarla un usuario debe estar loageado

app.use("/userAPI", _user["default"]);
app.use("/patientAPI", _patient["default"]);
app.use("/ccrAPI", _ccr["default"]);
app.use("/cbpAPI", _cbp["default"]);
app.use("/ccrSchedulingAPI", _ccrScheduling["default"]);
app.use("/cbpSchedulingAPI", _cbpScheduling["default"]);
app.use("/administrativeAPI", _administrative["default"]);
var port = 3000; // definicion del puerto

if (process.env.PORT) port = process.env.PORT; // si el sistema esta en producción se le asigna el puerto dado por el servidor, si no se queda con el 3000

app.listen(port, function () {
  // iniciar la aplicación en el puerto dado
  console.log("El servidor est\xE1 escuchando en el puerto ".concat(port));
});