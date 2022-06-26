import connection from './postgresConnection.js';


const functionQueries = {};

//Patient
functionQueries.getPatientCBPById = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM patientcbp WHERE id_patient=$1", [Id_Patient]);
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

functionQueries.getListPatientCBP = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select pat.id_patient, pat.name, pat.last_name,patcbp.state, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, patcbp.motivorechazo, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail, ldct.lung_rads ,ldct.ldct_date  from patient as pat inner join patientcbp as patcbp on pat.id_patient = patcbp.id_patient   left join (SELECT *    FROM ldct ldct   WHERE ldct.id_ldct = (SELECT ldct2.id_ldct               FROM ldct ldct2                WHERE ldct.id_patient = ldct2.id_patient and ldct2.ldct_date is not null                ORDER BY ldct2.ldct_date desc               LIMIT 1)) as ldct on pat.id_patient = ldct.id_patient   left join (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac group by id_patient) as datos2 on patcbp.id_patient = datos2.id_patient inner join enrollmentsurveycbp as survey on patcbp.id_patient = survey.id_patient");
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

functionQueries.getListPatientCbpForReports = function (req, res) {
  //query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select infpt.idpatientcbp, infpt.estadocbp, infpt.rut,infpt.name, infpt.lastname, infpt.lastname2, infpt.sex, infpt.edad, infpt.birthday, infpt.cesfam, infpt.cellphone,infpt.emergencycellphone, infpt.fonasa, infpt.derivacion,riskbasic.weight, riskbasic.height, riskbasic.imc, riskbasic.c_abdominal as cabdominal, riskbasic.pa_diastolic as padiastolic from (select pat.id_patient as idpatientcbp, patientcbp.state as estadocbp, pat.rut, pat.name, pat.last_name as lastname, pat.last_name2 as lastname2, pat.sex, date_part('year',Age(birthday)) as edad, pat.birthday,pat.cesfam, pat.cellphone, pat.emergency_phone as emergencycellphone, pat.fonasa, patientcbp.derivation_state_nfm as derivacion from patient as pat inner join patientcbp on patientcbp.id_patient = pat.id_patient) as infpt left join risksurveybasicbackground as riskbasic on riskbasic.id_patient = infpt.idpatientcbp");
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
}; //enrollmente survey


functionQueries.getListTAC0 = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='0' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='0' and patcbp.state!='Rechazado'");
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

functionQueries.getListTAC1 = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='1' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='1' and patcbp.state!='Rechazado'");
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
functionQueries.getListTAC2 = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='2' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='2' and patcbp.state!='Rechazado'");
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
functionQueries.getListTAC3 = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='3' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='3' and patcbp.state!='Rechazado'");
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
functionQueries.getListTAC4A = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='4A' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='4A' and patcbp.state!='Rechazado'");
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
functionQueries.getListTAC4B = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='4B' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='4B' and patcbp.state!='Rechazado'");
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
functionQueries.getListTAC4S = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select tac.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail from ldct as tac, (select tac.id_patient as id_patient, max(tac.ldct_date) as max_date from ldct as tac group by id_patient) as datos, (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac where lung_rads='4S' group by id_patient) as datos2, patient as pat, patientcbp as patcbp, enrollmentsurveycbp as survey where tac.id_patient= datos.id_patient and tac.ldct_date = datos.max_date and pat.id_patient=tac.id_patient  and patcbp.id_patient= pat.id_patient and survey.id_patient= pat.id_patient and datos2.id_patient = pat.id_patient and tac.lung_rads='4S' and patcbp.state!='Rechazado'");
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


functionQueries.RegisterEnrollmentSurveyCBP = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var Id_Patient = req.body.idPatient;
  var smokerIpa20 = req.body.smokerIpa20;

  if (smokerIpa20 == null) {
    smokerIpa20 = '0';
  }

  var exSmokerIpa2015Years = req.body.exSmokerIpa2015Years;

  if (exSmokerIpa2015Years == null) {
    exSmokerIpa2015Years = '0';
  }

  var ipa10 = req.body.ipa10;

  if (ipa10 == null) {
    ipa10 = '0';
  }

  var historyLungCancer = req.body.historyLungCancer;

  if (historyLungCancer == null) {
    historyLungCancer = '0';
  }

  var familyHistoryLungCancer = req.body.familyHistoryLungCancer;

  if (familyHistoryLungCancer == null) {
    familyHistoryLungCancer = '0';
  }

  var arsenicAsbestosExposure = req.body.arsenicAsbestosExposure;

  if (arsenicAsbestosExposure == null) {
    arsenicAsbestosExposure = '0';
  }

  var riskProfession = req.body.riskProfession;

  if (riskProfession == null) {
    riskProfession = '0';
  }

  var antofagastaResidenceOver5Years = req.body.antofagastaResidenceOver5Years;

  if (antofagastaResidenceOver5Years == null) {
    antofagastaResidenceOver5Years = '0';
  }

  var emphysemaFibrosis = req.body.emphysemaFibrosis;

  if (emphysemaFibrosis == null) {
    emphysemaFibrosis = '0';
  }

  connection.tx(function (t) {
    return t.any("INSERT INTO enrollmentsurveyCBP(id_patient, smoker_ipa20, ex_smoker_ipa20_15years, ipa10, history_lung_cancer, family_history_lung_cancer, arsenic_asbestos_exposure, risk_profession, antofagasta_residence_over_5_years, emphysema_fibrosis ) VALUES ( $1 , $2 , $3 , $4 , $5,$6,$7,$8,$9,$10) RETURNING id_enrollment_survey", [Id_Patient, smokerIpa20, exSmokerIpa2015Years, ipa10, historyLungCancer, familyHistoryLungCancer, arsenicAsbestosExposure, riskProfession, antofagastaResidenceOver5Years, emphysemaFibrosis]);
  }).then(function (data) {
    if (smokerIpa20 == 1 || exSmokerIpa2015Years == 1) {
      functionQueries.InsertStatePatientcbp(Id_Patient, "Activo");
      res.status(200).json({
        data: data,
        msg: "El paciente puede ingresar al programa de detección temprana del cáncer Broncopulmonar"
      });
    } else {
      if (ipa10 == 1 && (historyLungCancer == 1 || familyHistoryLungCancer == 1 || arsenicAsbestosExposure == 1 || riskProfession == 1 || antofagastaResidenceOver5Years == 1 || emphysemaFibrosis == 1)) {
        functionQueries.InsertStatePatientcbp(Id_Patient, "Activo");
        res.status(200).json({
          msg: "El paciente puede ingresar al programa de detección temprana del cáncer Broncopulmonar"
        });
      } else {
        functionQueries.InsertStatePatientcbp(Id_Patient, "Rechazado", 'El paciente NO puede ingresar al programa de detección temprana del cáncer Broncopulmonar ya que usted no cumple con los criterios de inclusión.');
        res.status(200).json({
          msg: "El paciente NO puede ingresar al programa de detección temprana del cáncer Broncopulmonar ya que usted no cumple con los criterios de inclusión."
        });
      }
    }

    // luego de insertar al paciente en la tabla colonrectal y siendo un paciente con estado activo, insertamos en las tablas para el ingreso de los datos obteniendolos mendiante las encuestas vistas en su perfil
    connection.tx(function (t) {
      return t.none("insert into risksurveybasicbackground (id_patient) values ($1)", [Id_Patient]);
    });

    connection.tx(function (t) {
      return t.none("insert into risksurveyhabits (id_patient) values ($1) ", [Id_Patient]);
    });

    connection.tx(function (t) {
      return t.none("insert into risksurveyfamilybackground (id_patient) values ($1) ", [Id_Patient]);
    });

    connection.tx(function (t) {
      return t.none("insert into risksurveypathologies (id_patient) values ($1) ", [Id_Patient]);
    });


  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};



functionQueries.UpdateEnrollmentSurveyCBP = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var smokerIpa20 = req.body.smokerIpa20;
  var exSmokerIpa2015Years = req.body.exSmokerIpa2015Years;
  var ipa10 = req.body.ipa10;
  var historyLungCancer = req.body.historyLungCancer;
  var familyHistoryLungCancer = req.body.familyHistoryLungCancer;
  var arsenicAsbestosExposure = req.body.arsenicAsbestosExposure;
  var riskProfession = req.body.riskProfession;
  var antofagastaResidenceOver5Years = req.body.antofagastaResidenceOver5Years;
  var emphysemaFibrosis = req.body.emphysemaFibrosis;

  connection.tx(function (t) {
    return t.none("UPDATE enrollmentsurveyCBP SET smoker_ipa20=$1, ex_smoker_ipa20_15years=$2, ipa10=$3, history_lung_cancer=$4, family_history_lung_cancer=$5, arsenic_asbestos_exposure=$6, risk_profession=$7, antofagasta_residence_over_5_years=$8, emphysema_fibrosis=$9 WHERE id_patient = $10 ", [smokerIpa20, exSmokerIpa2015Years, ipa10, historyLungCancer, familyHistoryLungCancer, arsenicAsbestosExposure, riskProfession, antofagastaResidenceOver5Years, emphysemaFibrosis, Id_Patient]);
  }).then(function (data) {
    if (smokerIpa20 == 1 || exSmokerIpa2015Years == 1) {
      functionQueries.UpdateStatePatientcbp(Id_Patient, "Activo");

      res.status(200).json({
        msg: "Actualizado correctamente."
      });
    }
    else {
      if (ipa10 == 1 && (historyLungCancer == 1 || familyHistoryLungCancer == 1 || arsenicAsbestosExposure == 1 || riskProfession == 1 || antofagastaResidenceOver5Years == 1 || emphysemaFibrosis == 1)) {
        functionQueries.UpdateStatePatientcbp(Id_Patient, "Activo");
        res.status(200).json({
          msg: "El paciente puede ingresar al programa de detección temprana del cáncer Broncopulmonar"
        });


      }
      else {
        functionQueries.UpdateStatePatientcbp(Id_Patient, "Rechazado");
        res.status(200).json({
          msg: "Actualizado correctamente."
        });
      }
    }

  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getListEnrollmentSurveyCBP = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("SELECT * FROM enrollmentsurveyCBP");
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
functionQueries.getEnrollmentSurveyCBPByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM enrollmentsurveyCBP WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.InsertStatePatientcbp = function (IdPatient, State,motivorechazo, next) {//query encargada de ingresar los usuarios

  var State = State;
  var Id_Patient = IdPatient;
  var motivorechazo = motivorechazo;
  connection.tx(function (t) {
    return t.none("insert into patientcbp (id_patient, state, motivorechazo) VALUES ($1,$2,$3)", [Id_Patient, State, motivorechazo]);
  })
};
functionQueries.UpdateStatePatientcbp = function (IdPatient, State, next) {//query encargada de ingresar los usuarios

  var State = State;
  var Id_Patient = IdPatient;
  connection.tx(function (t) {
    return t.none("update patientcbp SET state=$2 WHERE id_patient =$1", [Id_Patient, State]);
  })
};

//Exams
functionQueries.RegisterLDCT = function (req, res, next) {//query encargada de ingresar los usuarios
  var Id_Patient = req.body.idPatient;
  var lungRads = req.body.lungRads;
  var ldctDate = new Date(req.body.ldctDate);
  var size = req.body.size;
  var nodule = req.body.nodule;
  var contact = "0";
  var nextDate = new Date(req.body.ldctDate);
  var petTc = "0";
  var proposedTime = null;
  var biopsy = "0";
  if (lungRads == "0") {
    nextDate.setDate(nextDate.getDate() + 365)
  }
  if (lungRads == "1") {
    nextDate.setDate(nextDate.getDate() + 365)
  }
  if (lungRads == "2") {
    nextDate.setDate(nextDate.getDate() + 365)

  }
  if (lungRads == "3") {
    nextDate.setDate(nextDate.getDate() + 182)
  }
  if (lungRads == "4A") {
    proposedTime = Number(req.body.proposedTime);
    petTc = req.body.petTc;
    if (proposedTime == 0) {
      nextDate = null;
    }
    else {
      nextDate.setDate(nextDate.getDate() + proposedTime)
    }
    biopsy = req.body.biopsy;
  }
  if (lungRads == "4B") {
    proposedTime = Number(req.body.proposedTime);
    petTc = req.body.petTc;
    if (proposedTime == 0) {
      nextDate = null;
    }
    else {
      nextDate.setDate(nextDate.getDate() + proposedTime)
    }
    biopsy = req.body.biopsy;

  }
  if (lungRads == "4S") {
    proposedTime = Number(req.body.proposedTime);
    petTc = req.body.petTc;
    if (proposedTime == 0) {
      nextDate = null;
    }
    else {
      nextDate.setDate(nextDate.getDate() + proposedTime)
    }
    biopsy = req.body.biopsy;
  }

  connection.tx(function (t) {
    return t.any("INSERT INTO ldct( id_patient, lung_rads, ldct_date, size, nodule, contact, next_date,pet_tc, biopsy ) VALUES ( $1 , $2 , $3,$4,$5,$6,$7,$8,$9) RETURNING id_ldct", [Id_Patient, lungRads, ldctDate, size, nodule, contact, nextDate, petTc, biopsy]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado el tac"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getListTACById = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM ldct WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getListTAC = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("SELECT * FROM ldct");
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
functionQueries.ldctDelete = (req, res) => {
  var idLdct = req.body.idLdct;


  connection.tx(t => {
    return t.none("DELETE FROM ldct WHERE id_ldct = $1", [idLdct]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
}
functionQueries.RegisterBiopsyCBP = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var type = req.body.type;
  var biopsyDate = req.body.biopsyDate;


  connection.tx(function (t) {
    return t.any("INSERT INTO biopsycbp( id_patient, type, biopsy_date) VALUES ($1,$2,$3) RETURNING id_biopsy", [Id_Patient, type, biopsyDate]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la biopsia"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getBiopsyByIdCBP = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM biopsycbp WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.biopsyCBPDelete = (req, res) => {
  var idBiopsy = req.body.idBiopsy;


  connection.tx(t => {
    return t.none("DELETE FROM biopsycbp WHERE id_biopsy = $1", [idBiopsy]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
}

//Tracking
functionQueries.UpdateContactLungRads = function (req, res, next) {//query encargada de ingresar los usuarios

  var id_patient = req.body.id_patient;
  var contact = req.body.contact;

  connection.tx(function (t) {
    return t.none("UPDATE ldct SET contact=$1 WHERE id_patient = $2", [contact, id_patient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado el paciente contactado"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.GetScheduleTrackingLungRADS = function (req, res) {//query encargada de obtener al usuario
  var overdue = new Date();
  overdue.setDate(overdue.getDate() + 7);
  connection.tx(function (t) {
    return t.any("select tac.id_patient,pat.name, pat.last_name, pat.last_name2, pat.cellphone, pat.emergency_phone, pat.mail, tac.ldct_date, tac.next_date, tac.contact from ldct as tac, (select tac.id_patient as id_patient, max(tac.next_date) as max_date from ldct as tac group by id_patient) as datos, patient as pat, patientcbp as patcbp where patcbp.id_patient=pat.id_patient and tac.next_date = datos.max_date and pat.id_patient = tac.id_patient and patcbp.state='Activo' and datos.id_patient = tac.id_patient and tac.next_date < $1", [overdue]);
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


functionQueries.UpdatePatientCBP = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var id_patient = req.body.idPatient;
  var state = req.body.state;
  var cancer_detection_date= req.body.cancerDetectionDate;
  var derivation_state_nfm= req.body.derivationStateNfm;
  var motivorechazo = req.body.motivorechazo;
  if (cancer_detection_date==""){
    cancer_detection_date=null;
  }
  
  connection.tx(function (t) {
    return t.none("UPDATE patientcbp SET state=$2, cancer_detection_date=$3,derivation_state_nfm=$4, motivorechazo=$5 WHERE id_patient= $1;", [id_patient, state,cancer_detection_date,derivation_state_nfm, motivorechazo]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado el paciente correctamente"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};




functionQueries.RegisterRiskSurveyBasic = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var cAbdominal = req.body.cAbdominal;
  var paSystolic = req.body.paSystolic;
  var paDiastolic = req.body.paDiastolic;
  var weight = req.body.weight;
  var height = req.body.height;
  var imc = req.body.imc;
  var regularMedications = req.body.regularMedications;
  var reasonMedicines = req.body.reasonMedicines;
  var anticoagulants = req.body.anticoagulants;
  var wichAnticoagulants = req.body.wichAnticoagulants;
  var colonoscopyRejection = req.body.colonoscopyRejection;
  var colonoscopyRejectionSignature = req.body.colonoscopyRejectionSignature;
  var signConsent = req.body.signConsent;
  var instructiveTsdo = req.body.instructiveTsdo;

  connection.tx(function (t) {
    return t.any("INSERT INTO risksurveybasicbackground(id_patient, c_abdominal, pa_systolic, pa_diastolic, weight, height, imc, regular_medications, reason_medicines, anticoagulants, wich_anticoagulants, colonoscopy_rejection, colonoscopy_rejection_signature, sign_consent, instructive_tsdo ) VALUES ( $1 , $2 , $3 , $4 , $5,$6, $7 , $8 , $9 , $10,$11, $12 , $13 , $14 , $15) RETURNING id_risk_survey_bd ", [idPatient, cAbdominal, paSystolic, paDiastolic, weight, height, imc, regularMedications, reasonMedicines, anticoagulants, wichAnticoagulants, colonoscopyRejection, colonoscopyRejectionSignature, signConsent, instructiveTsdo]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la encuesta de factores de riesgos antecedentes generales"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.UpdateRiskSurveyBasic = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var cAbdominal = req.body.cAbdominal;
  var paSystolic = req.body.paSystolic;
  var paDiastolic = req.body.paDiastolic;
  var weight = req.body.weight;
  var height = req.body.height;
  var imc = req.body.imc;
  var regularMedications = req.body.regularMedications;
  var reasonMedicines = req.body.reasonMedicines;
  var anticoagulants = req.body.anticoagulants;
  var wichAnticoagulants = req.body.wichAnticoagulants;
  var colonoscopyRejection = req.body.colonoscopyRejection;
  var colonoscopyRejectionSignature = req.body.colonoscopyRejectionSignature;
  var signConsent = req.body.signConsent;
  var instructiveTsdo = req.body.instructiveTsdo;
  connection.tx(function (t) {
    return t.none("UPDATE risksurveybasicbackground SET c_abdominal=$1, pa_systolic=$2, pa_diastolic=$3, weight=$4, height=$5, imc=$6, regular_medications=$7, reason_medicines=$8, anticoagulants=$9, wich_anticoagulants=$10, colonoscopy_rejection=$11, colonoscopy_rejection_signature=$12, sign_consent=$13, instructive_tsdo=$14 WHERE id_patient = $15 ", [cAbdominal, paSystolic, paDiastolic, weight, height, imc, regularMedications, reasonMedicines, anticoagulants, wichAnticoagulants, colonoscopyRejection, colonoscopyRejectionSignature, signConsent, instructiveTsdo, idPatient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado la encuesta de riesgo"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.RegisterRiskSurveyPathologies = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var arterialHypertension = req.body.arterialHypertension;
  var diabetes = req.body.diabetes;
  var epilepsy = req.body.epilepsy;
  var gastricUlcer = req.body.gastricUlcer;
  var hypoHyperThyroidism = req.body.hypoHyperThyroidism;
  var operated = req.body.operated;
  var operationReason = req.body.operationReason;
  var cancer = req.body.cancer;
  var typeCancer = req.body.typeCancer;
  var cancerAge = req.body.cancerAge;


  connection.tx(function (t) {
    return t.any("INSERT INTO risksurveypathologies(id_patient, arterial_hypertension, diabetes, epilepsy, gastric_ulcer, hypo_hyper_thyroidism, operated, operation_reason, cancer, type_cancer, cancer_age) VALUES ( $1 , $2 , $3 , $4 , $5,$6, $7 , $8 , $9 , $10,$11) RETURNING id_risk_survey_pathologies ", [idPatient, arterialHypertension, diabetes, epilepsy, gastricUlcer, hypoHyperThyroidism, operated, operationReason, cancer, typeCancer, cancerAge]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la encuesta de factores de riesgo antecedentes médicos"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.UpdateRiskSurveyPathologies = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var arterialHypertension = req.body.arterialHypertension;
  var diabetes = req.body.diabetes;
  var epilepsy = req.body.epilepsy;
  var gastricUlcer = req.body.gastricUlcer;
  var hypoHyperThyroidism = req.body.hypoHyperThyroidism;
  var operated = req.body.operated;
  var operationReason = req.body.operationReason;
  var cancer = req.body.cancer;
  var typeCancer = req.body.typeCancer;
  var cancerAge = req.body.cancerAge;


  connection.tx(function (t) {
    return t.none("UPDATE risksurveypathologies SET arterial_hypertension=$1, diabetes=$2, epilepsy=$3, gastric_ulcer=$4, hypo_hyper_thyroidism=$5, operated=$6, operation_reason=$7, cancer=$8, cancer_age=$9, type_cancer=$10 WHERE id_patient = $11 ", [arterialHypertension, diabetes, epilepsy, gastricUlcer, hypoHyperThyroidism, operated, operationReason, cancer, cancerAge, typeCancer, idPatient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado la encuesta de riesgo"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.RegisterRiskSurveyHabits = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var smokes = req.body.smokes;
  var numberCigarettes = req.body.numberCigarettes;
  var yearsSmoking = req.body.yearsSmoking;
  var eatCerealFiber = req.body.eatCerealFiber;
  var drinkAlcohol = req.body.drinkAlcohol;
  var quantityAlcohol = req.body.quantityAlcohol;
  var physicalActivity = req.body.physicalActivity;
  var threeFruits = req.body.threeFruits;
  var friedFoods = req.body.friedFoods;

  connection.tx(function (t) {
    return t.any("INSERT INTO risksurveyhabits( id_patient, smokes, number_cigarettes, years_smoking, eat_cereal_fiber, drink_alcohol, quantity_alcohol, physical_activity, three_fruits, fried_foods ) VALUES ( $1 , $2 , $3 , $4 , $5,$6, $7 , $8 , $9 , $10) RETURNING id_risk_survey_habits", [idPatient, smokes, numberCigarettes, yearsSmoking, eatCerealFiber, drinkAlcohol, quantityAlcohol, physicalActivity, threeFruits, friedFoods]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la encuesta de factores de riesgo hábitos "
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.UpdateRiskSurveyHabits = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var smokes = req.body.smokes;
  var numberCigarettes = req.body.numberCigarettes;
  var yearsSmoking = req.body.yearsSmoking;
  var eatCerealFiber = req.body.eatCerealFiber;
  var drinkAlcohol = req.body.drinkAlcohol;
  var quantityAlcohol = req.body.quantityAlcohol;
  var physicalActivity = req.body.physicalActivity;
  var threeFruits = req.body.threeFruits;
  var friedFoods = req.body.friedFoods;

  connection.tx(function (t) {
    return t.none("UPDATE risksurveyhabits SET smokes=$1, number_cigarettes=$2, years_smoking=$3, eat_cereal_fiber=$4, drink_alcohol=$5, quantity_alcohol=$6, physical_activity=$7, three_fruits=$8, fried_foods=$9 WHERE id_patient = $10 ", [smokes, numberCigarettes, yearsSmoking, eatCerealFiber, drinkAlcohol, quantityAlcohol, physicalActivity, threeFruits, friedFoods, idPatient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado la encuesta de riesgo"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.RegisterRiskSurveyFamily = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var familyMemberCancer = req.body.familyMemberCancer;
  var moreThreeFamilyMemberCancer = req.body.moreThreeFamilyMemberCancer;
  var familyMemberWithCancerColorectal = req.body.familyMemberWithCancerColorectal;
  var wichFamilyMemberWithCancerColorectal = req.body.wichFamilyMemberWithCancerColorectal;

  connection.tx(function (t) {
    return t.any("INSERT INTO risksurveyfamilybackground(id_patient, family_member_cancer, more_three_family__member_cancer, family_member_with_cancer_colorectal, wich_family_member_with_cancer_colorectal) VALUES ( $1 , $2 , $3 , $4 , $5) RETURNING id_risk_survey_family_background", [idPatient, familyMemberCancer, moreThreeFamilyMemberCancer, familyMemberWithCancerColorectal, wichFamilyMemberWithCancerColorectal]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la encuesta de factores de riesgo antecedentes familiares"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.UpdateRiskSurveyFamily = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var familyMemberCancer = req.body.familyMemberCancer;
  var moreThreeFamilyMemberCancer = req.body.moreThreeFamilyMemberCancer;
  var familyMemberWithCancerColorectal = req.body.familyMemberWithCancerColorectal;
  var wichFamilyMemberWithCancerColorectal = req.body.wichFamilyMemberWithCancerColorectal;

  connection.tx(function (t) {
    return t.none("UPDATE risksurveyfamilybackground SET family_member_cancer=$1, more_three_family_member_cancer=$2, family_member_with_cancer_colorectal=$3, wich_family_member_with_cancer_colorectal=$4 WHERE id_patient = $5 ", [familyMemberCancer, moreThreeFamilyMemberCancer, familyMemberWithCancerColorectal, wichFamilyMemberWithCancerColorectal, idPatient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado la encuesta de riesgo"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.RegisterRiskSurveyFamilyCancer = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var familyMember = req.body.familyMember;
  var age = req.body.age;
  var cancer = req.body.cancer;

  connection.tx(function (t) {
    return t.any("INSERT INTO risksurveyfamilycancer(id_patient, family_member, age, cancer) VALUES ( $1 , $2 , $3 , $4 ) RETURNING id_risk_survey_family_cancer", [idPatient, familyMember, age, cancer]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la encuesta de factores de riesgo familiares con cáncer"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.UpdateRiskSurveyFamilyCancer = function (req, res, next) {//query encargada de ingresar los usuarios

  var idPatient = req.body.idPatient;
  var familyMember = req.body.familyMember;
  var age = req.body.age;
  var cancer = req.body.cancer;

  connection.tx(function (t) {
    return t.none("UPDATE risksurveyfamilycancer SET family_member=$1, age=$2, cancer=$3 WHERE id_patient = $4 ", [familyMember, age, cancer, idPatient]);
  }).then(function (data) {
    res.status(200).json({
      msg: "Se ha actualizado la encuesta de riesgo"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getRiskSurveyBasicByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM risksurveybasicbackground WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getRiskSurveyPathologiesByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM risksurveypathologies WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getRiskSurveyHabitsByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM risksurveyhabits WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getRiskSurveyFamilyByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM risksurveyfamilybackground WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.getRiskSurveyFamilyCancerByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM risksurveyfamilycancer WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.familyDelete = (req, res) => {
  var idRiskSurveyFamilyCancer = req.body.idRiskSurveyFamilyCancer;


  connection.tx(t => {
    return t.none("DELETE FROM risksurveyfamilycancer WHERE id_risk_survey_family_cancer = $1", [idRiskSurveyFamilyCancer]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
};


export default functionQueries;


