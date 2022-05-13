"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _postgresConnection = _interopRequireDefault(require("./postgresConnection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var functionQueries = {};

functionQueries.RegisterSchedule = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var title = req.body.title;
  var cancer = req.body.cancer;
  var startAppointment = req.body.start;
  var endAppointment = req.body.end;
  var location = req.body.location;
  var comment = req.body.comment;
  var patients = req.body.patients;

  _postgresConnection["default"].tx(function (t) {
    return t.any("INSERT INTO schedule(title, cancer, start, end_appointment, location, comment) VALUES ( $1 , $2 , $3 , $4 , $5,$6) RETURNING id_schedule", [title, cancer, startAppointment, endAppointment, location, comment]);
  }).then(function (data) {
    if (patients.length > 0) {
      for (var a = 0; a <= patients.length - 1; a++) {
        functionQueries.RegisterPatientSchedule(patients[a].name, patients[a].age, patients[a].rut, data[0].idSchedule);
      }
    }

    res.status(200).json({
      data: data,
      msg: "Se ha ingresado una cita"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.GetScheduleCCR = function (req, res) {
  //query encargada de obtener al usuario
  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT sche.id_schedule, sche.title, sche.cancer, sche.start, sche.end_appointment as end, sche.location,sche.comment AS schedule, json_agg(json_build_object('id_schedule_patient', schepac.id_schedule_patient,'name',schepac.name, 'age',schepac.age,'rut',schepac.rut,  'state', schepac.state, 'contact', schepac.contact)) as patients FROM schedule AS sche LEFT JOIN schedulepatients AS schepac ON (sche.id_schedule=schepac.id_schedule) where cancer='Cáncer colorectal' GROUP BY sche.id_schedule ORDER BY sche.id_schedule");
  }).then(function (data) {
    res.status(200).json({
      data: data
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.GetScheduleRangeCCR = function (req, res) {
  //query encargada de obtener al usuario
  var start = req.body.start;
  var endAppointment = req.body.end;

  _postgresConnection["default"].tx(function (t) {
    return t.any("SELECT sche.id_schedule, sche.title, sche.cancer, sche.start, sche.end_appointment as end, sche.location,sche.comment AS schedule, json_agg(json_build_object('id_schedule_patient', schepac.id_schedule_patient,'name',schepac.name, 'age',schepac.age,'rut',schepac.rut,  'state', schepac.state, 'contact', schepac.contact)) as patients FROM schedule AS sche LEFT JOIN schedulepatients AS schepac ON (sche.id_schedule=schepac.id_schedule) where sche.start>$1 and sche.end_appointment<$2 and cancer='Cáncer colorectal' GROUP BY sche.id_schedule ORDER BY sche.id_schedule", [start, endAppointment]);
  }).then(function (data) {
    res.status(200).json({
      data: data
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.RegisterPatientSchedule = function (name, age, rut, idSchedule) {
  //query encargada de ingresar los usuarios
  var name = name;
  var age = age;
  var rut = rut;
  var idSchedule = idSchedule;

  _postgresConnection["default"].tx(function (t) {
    return t.none("INSERT INTO schedulepatients(name,age,rut,id_schedule, state, contact) VALUES ( $1,$2, $3,$4,$5,$6)", [name, age, rut, idSchedule, false, false]);
  });
};

functionQueries.UpdateSchedule = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var title = req.body.title;
  var cancer = req.body.cancer;
  var startAppointment = req.body.start;
  var endAppointment = req.body.end;
  var location = req.body.location;
  var comment = req.body.comment;
  var patients = req.body.patients;
  var idSchedule = req.body.idSchedule;

  _postgresConnection["default"].tx(function (t) {
    return t.none("UPDATE schedule SET title=$2, cancer=$3, start=$4, end_appointment=$5, location=$6, comment=$7 WHERE id_schedule=$1 ", [idSchedule, title, cancer, startAppointment, endAppointment, location, comment]);
  }).then(function (data) {
    functionQueries.DeletePatientSchedule(idSchedule);

    for (var a = 0; a <= patients.length - 1; a++) {
      functionQueries.RegisterPatientSchedule(patients[a].name, patients[a].age, patients[a].rut, idSchedule);
    }

    res.status(200).json({
      msg: "Se ha actualizado la cita"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};

functionQueries.updatePatientScheduleState = function (idSchedule, id_schedule_patient, state) {
  var idSchedule = idSchedule;

  _postgresConnection["default"].tx(function (t) {
    return t.none("UPDATE schedulepatients SET state=$3 WHERE id_schedule=$1 and id_schedule_patient=$2", [idSchedule, id_schedule_patient, state]);
  });
};

functionQueries.DeletePatientSchedule = function (idSchedule) {
  var idSchedule = idSchedule;

  _postgresConnection["default"].tx(function (t) {
    return t.none("DELETE FROM schedulepatients WHERE id_schedule = $1", [idSchedule]);
  });
};

var _default = functionQueries;
exports["default"] = _default;