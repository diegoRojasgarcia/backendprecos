import connection from './postgresConnection.js';

const functionQueries = {};


functionQueries.RegisterPatient = function (req, res, next) {//query encargada de ingresar los usuarios

var Rut = req.body.rut;
var Name = req.body.name;
var LastName = req.body.lastName;
var LastName2 = req.body.lastName2;
var Sex= req.body.sex;
var Nationality= req.body.nationality;
var Birthday= req.body.birthday;
var Region =req.body.region;
var previousRegion =req.body.previousRegion;
var Commune =req.body.commune;
var medicalFacility = req.body.medicalFacility;
var Cesfam = req.body.cesfam;
var Address= req.body.address;
var Village = req.body.village;
var residenceTime = req.body.residenceTime;
var Cellphone = req.body.cellphone;
var Mail = req.body.mail;
var MaritalState= req.body.maritalState;
var emergencyPhone = req.body.emergencyPhone;
var Deceased = req.body.deceased;
var Fonasa = req.body.fonasa;
var volunteerAgreement= req.body.volunteerAgreement;
var deceasedByCancer = req.body.deceasedByCancer;
var isapre = req.body.isapre;
var extranjero = req.body.extranjero;

connection.tx(function (t) {
  return t.any("INSERT INTO patient(rut, name, last_name, last_name2, sex, nationality, birthday, region, previous_region, commune, medical_facility, cesfam, address, village, residence_time, cellphone, mail, marital_state, emergency_phone, deceased, fonasa, volunteer_agreement, deceased_by_cancer,isapre, extranjero) VALUES ( $1 , $2 , $3 , $4 , $5,$6, $7, $8, $9,$10, $11, $12, $13,$14, $15, $16, $17,$18, $19, $20, $21,$22, $23,24$,25$) RETURNING id_patient", [ Rut, Name, LastName, LastName2, Sex,Nationality,Birthday,Region,previousRegion,Commune,medicalFacility,Cesfam,Address,Village,residenceTime,Cellphone,Mail,MaritalState,emergencyPhone,Deceased,Fonasa,volunteerAgreement, deceasedByCancer,isapre,extranjero]);
}).then(function (data) {
  res.status(200).json({
    data:data,
    msg: "Se ha ingresado un paciente"
  });
})["catch"](function (err) {
  res.status(500).json({
    err: err,
    msg: "Ha ocurrido un error"
  });
});
};
functionQueries.UpdatePatient = function (req, res, next) {//query encargada de ingresar los usuarios

var Rut = req.body.rut;
var Name = req.body.name;
var LastName = req.body.lastName;
var LastName2 = req.body.lastName2;
var Sex= req.body.sex;
var Nationality= req.body.nationality;
var Birthday= req.body.birthday;
var Region =req.body.region;
var previousRegion = req.body.previousRegion;
var Commune =req.body.commune;
var medicalFacility = req.body.medicalFacility;
var Cesfam = req.body.cesfam;
var Address= req.body.address;
var Village = req.body.village;
var residenceTime = req.body.residenceTime;
var Cellphone = req.body.cellphone;
var Mail = req.body.mail;
var MaritalState= req.body.maritalState;
var emergencyPhone = req.body.emergencyPhone;
var Deceased = req.body.deceased;
var Fonasa = req.body.fonasa;
var volunteerAgreement= req.body.volunteerAgreement;
var deceasedByCancer = req.body.deceasedByCancer;
var Id_Patient = req.body.idPatient;
var deceaseDate = req.body.deceaseDate;
var isapre = req.body.isapre;
var extranjero = req.body.extranjero;

if(deceaseDate==""){
  deceaseDate=null;
}
connection.tx(function (t) {
return t.none("UPDATE patient SET rut=$2, name=$3, last_name=$4, last_name2=$5, sex=$6, nationality=$7, birthday=$8, region=$9, commune=$10,medical_facility=$11, cesfam=$12, address=$13, village=$14, residence_time=$15, cellphone=$16, mail=$17, marital_state=$18, emergency_phone=$19, deceased=$20, fonasa=$21, volunteer_agreement=$22, deceased_by_cancer=$23, previous_region=$24, decease_date=$25,isapre=$26,extranjero=$27 WHERE id_patient=$1", [Id_Patient ,Rut, Name, LastName, LastName2, Sex,Nationality,Birthday,Region,Commune,medicalFacility,Cesfam,Address,Village,residenceTime,Cellphone,Mail,MaritalState,emergencyPhone,Deceased,Fonasa,volunteerAgreement, deceasedByCancer, previousRegion, deceaseDate,isapre, extranjero]);
}).then(function (data) {
  res.status(200).json({
    msg: "Se ha actualizado un paciente"
  });
})["catch"](function (err) {
  res.status(500).json({
    err: err,
    msg: "Ha ocurrido un error"
  });
});
};

functionQueries.getPatients = function (req, res) {//query encargada de obtener al usuario

connection.tx(function (t) {
return t.any("select * from patient");
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
functionQueries.getPatientById = function (req, res) {//query encargada de obtener al usuario
var Id_Patient= req.body.idPatient;
connection.tx(function (t) {
return t.any("SELECT * FROM patient WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getPatientsByRut= function (req, res) {//query encargada de obtener al usuario
var rut= req.body.rut;
connection.tx(function (t) {
return t.any("SELECT * FROM patient WHERE rut=$1", [rut]);
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
functionQueries.getPatientsCancerByRut= function (req, res) {//query encargada de obtener al usuario
var rut= req.body.rut;
connection.tx(function (t) {
return t.any("select pat.id_patient, ccr.id_enrollment_survey as ccr, cbp.id_enrollment_survey as cbp from patient as pat left join enrollmentsurveycbp as cbp on pat.id_patient = cbp.id_patient left join enrollmentsurveyccr as ccr on pat.id_patient = ccr.id_patient where pat.rut=$1", [rut]);
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

functionQueries.deleteAllForPatient= function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.none("delete from patient where id_patient = $1", [Id_Patient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Paciente eliminado"
    });
  })["catch"](function (err) {
  res.status(500).json({
  err: err,
  msg: "Ha ocurrido un error"
  });
  });
};


export default functionQueries;