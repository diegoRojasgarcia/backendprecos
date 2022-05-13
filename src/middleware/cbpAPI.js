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
    return t.any(`select pat.id_patient, pat.name, pat.last_name, pat.last_name2, date_part('year',Age(pat.birthday)) as age, patcbp.derivation_state_nfm, survey.risk_profession, datos2.tac_counter, pat.cellphone, pat.mail, ldct.lung_rads ,ldct.ldct_date 
    from patient as pat inner join patientcbp as patcbp on pat.id_patient = patcbp.id_patient
    left join (SELECT *
    FROM ldct ldct
    WHERE ldct.id_ldct = (SELECT ldct2.id_ldct
                  FROM ldct ldct2
                  WHERE ldct.id_patient = ldct2.id_patient and ldct2.ldct_date is not null
                  ORDER BY ldct2.ldct_date desc
                  LIMIT 1)) as ldct on pat.id_patient = ldct.id_patient
    left join (select tac.id_patient as id_patient, count(tac.id_ldct) as tac_counter from ldct as tac group by id_patient) as datos2 on patcbp.id_patient = datos2.id_patient 
    inner join enrollmentsurveycbp as survey on patcbp.id_patient = survey.id_patient
    where patcbp.state!='Rechazado'`);
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


//Enrollment survey

functionQueries.RegisterEnrollmentSurveyCBP = function (req, res, next) {//query encargada de ingresar los usuarios

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
    }
    else {
      if (ipa10 == 1 && (historyLungCancer == 1 || familyHistoryLungCancer == 1 || arsenicAsbestosExposure == 1 || riskProfession == 1 || antofagastaResidenceOver5Years == 1 || emphysemaFibrosis == 1)) {
        functionQueries.InsertStatePatientcbp(Id_Patient, "Activo");
        res.status(200).json({
          msg: "El paciente puede ingresar al programa de detección temprana del cáncer Broncopulmonar"
        });


      }
      else {
        functionQueries.InsertStatePatientcbp(Id_Patient, "Rechazado");
        res.status(200).json({
          msg: "El paciente NO puede ingresar al programa de detección temprana del cáncer Broncopulmonar ya que usted no cumple con los criterios de inclusión."
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
functionQueries.InsertStatePatientcbp = function (IdPatient, State, next) {//query encargada de ingresar los usuarios

  var State = State;
  var Id_Patient = IdPatient;
  connection.tx(function (t) {
    return t.none("insert into patientcbp (id_patient, state) VALUES ($1,$2)", [Id_Patient, State]);
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
  if (cancer_detection_date==""){
    cancer_detection_date=null;
  }
  var derivation_state_nfm= req.body.derivationStateNfm;
  

  connection.tx(function (t) {
    return t.none("UPDATE patientcbp SET state=$2, cancer_detection_date=$3,derivation_state_nfm=$4 WHERE id_patient= $1;", [id_patient, state,cancer_detection_date,derivation_state_nfm]);
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
export default functionQueries;