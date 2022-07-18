import connection from './postgresConnection.js';


const functionQueries = {};

//patient
functionQueries.getPatientCCRById = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM patientccr WHERE id_patient=$1", [Id_Patient]);
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


functionQueries.getListPatientCcr = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("select pat.id_patient, pat.name, pat.last_name, pat.last_name2, pat.rut, patccr.state, col.test_result as coloncheck_result, colon.test_result as colonoscopy_result, colon.polyps, colon.neoplastic_lesion, colon.test_date as last_colonoscopy_date, patccr.motivorechazo   from patient as pat inner join patientccr as patccr on pat.id_patient = patccr.id_patient  left join(  SELECT * FROM coloncheck col  WHERE col.id_coloncheck = (SELECT col2.id_coloncheck            FROM coloncheck col2            WHERE col.id_patient = col2.id_patient and col2.test_date is not null       ORDER BY col2.test_date desc             LIMIT 1)) as col on pat.id_patient = col.id_patient  left join(  SELECT *  FROM colonoscopy colon  WHERE colon.id_colonoscopy = (SELECT colon2.id_colonoscopy         FROM colonoscopy colon2        WHERE colon.id_patient = colon2.id_patient and colon2.test_date is not null              ORDER BY colon2.test_date desc              LIMIT 1)) as colon on pat.id_patient = colon.id_patient               ");
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


functionQueries.getListPatientCcrForReports = function (req, res) {
  //query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("select patient.id_patient, rut, patient.name, last_name,last_name2, sex, date_part('year',Age(patient.birthday)) as edad, to_char( birthday, 'DD-MON-YYYY') as birthday,cellphone,emergency_phone,mail, address, village, cesfam, fonasa, isapre, patientccr.state, rskhabits.smokes, rskhabits.drink_alcohol, rskhabits.typeactivity, rskbasic.c_abdominal, rskbasic.pa_systolic, rskbasic.weight, rskbasic.height, rskbasic.imc, colontest.colontestresult,colontest.test_date as fechacolontest, cnoscopy.test_result as colonosresult, cnoscopy.test_date as fechacolonoscopy, cnoscopy.polyps, cnoscopy.neoplastic_lesion, bioccr.biopsydate,rskpatho.diabetes,rskpatho.epilepsy,rskpatho.gastric_ulcer,rskpatho.hypo_hyper_thyroidism,rskpatho.operated,rskpatho.cancer from patient inner join patientccr on patientccr.id_patient = patient.id_patient left join risksurveyhabits as rskhabits on rskhabits.id_patient = patient.id_patient left join risksurveypathologies as rskpatho on rskpatho.id_patient = patientccr.id_patient left join risksurveybasicbackground as rskbasic on rskbasic.id_patient = patientccr.id_patient left join (select coloncheck.id_patient, test_result as colontestresult, to_char( test_date, 'DD-MON-YYYY') as test_Date from coloncheck inner join (select id_patient, max(test_date) as maxcolontest from coloncheck group by id_patient) as cntest on cntest.id_patient = coloncheck.id_patient and cntest.maxcolontest = coloncheck.test_date) as colontest on colontest.id_patient = patientccr.id_patient left join (select colonoscopy.id_patient,to_char( test_date, 'DD-MON-YYYY') as test_Date, test_result, polyps, neoplastic_lesion  from colonoscopy inner join (select id_patient, max(test_date) as maxcolonoscopy  from colonoscopy group by id_patient) as colontest on colontest.id_patient = colonoscopy.id_patient and colontest.maxcolonoscopy = colonoscopy.test_date) as cnoscopy on cnoscopy.id_patient = patientccr.id_patient left join (select biopsyccr.id_patient, to_char( biopsy_date, 'DD-MON-YYYY') as biopsydate from biopsyccr inner join (select id_patient,max(biopsy_date) as fechabiopsy from biopsyccr group by id_patient ) as bioccr on bioccr.id_patient = biopsyccr.id_patient and bioccr.fechabiopsy = biopsyccr.biopsy_date) as bioccr on bioccr.id_patient = patient.id_patient");
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

functionQueries.RegisterEnrollmentSurveyCCR = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var Id_Patient = req.body.idPatient;
  var BleedingInStools = req.body.bleedingInStools;

  if (BleedingInStools == null) {
    BleedingInStools = '0';
  }

  var AlterationOfBowelHabits = req.body.alterationOfBowelHabits;

  if (AlterationOfBowelHabits == null) {
    AlterationOfBowelHabits = '0';
  }

  var AbdominalPain = req.body.abdominalPain;

  if (AbdominalPain == null) {
    AbdominalPain = '0';
  }

  var weightLoss = req.body.weightLoss;

  if (weightLoss == null) {
    weightLoss = '0';
  }

  var CaColonRectum = req.body.caColonRectum;

  if (CaColonRectum == null) {
    CaColonRectum = '0';
  }

  var colonoscopy = req.body.colonoscopy;

  if (colonoscopy == null) {
    colonoscopy = '0';
  }

  var colitis = req.body.colitis;

  if (colitis == null) {
    colitis = '0';
  }

  var crohn = req.body.crohn;

  if (crohn == null) {
    crohn = '0';
  }

  connection.tx(function (t) {
    return t.any("INSERT INTO enrollmentsurveyCCR(id_patient, bleeding_in_stools, alteration_of_bowel_habits, abdominal_pain, weight_loss, ca_colon_rectum, colonoscopy, colitis, crohn ) VALUES ( $1 , $2 , $3 , $4 , $5,$6,$7,$8,$9) RETURNING id_enrollment_survey", [Id_Patient, BleedingInStools, AlterationOfBowelHabits, AbdominalPain, weightLoss, CaColonRectum, colonoscopy, colitis, crohn]);
  }).then(function (data) {
    if (BleedingInStools == 0 & AlterationOfBowelHabits == 0 & AbdominalPain == 0 & weightLoss == 0 & CaColonRectum == 0 & colonoscopy == 0 & colitis == 0 & crohn == 0) {
      functionQueries.InsertStatePatientccr(Id_Patient, "Activo");
      res.status(200).json({
        data: data,
        msg: "El paciente puede ingresar al programa de detección temprana del cáncer colorectal"
      });      // --------------------------------------------------------------------------------------------------------------------------------------

    } else {
      if (BleedingInStools == 1 | AlterationOfBowelHabits == 1 | AbdominalPain == 1 | weightLoss == 1) {
        functionQueries.InsertStatePatientccr(Id_Patient, "Rechazado", "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que no cumple con los criterios de inclusión, el paciente debe tomar hora urgente con gastroenterología en su consultorio.");
        res.status(200).json({
          msg: "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que no cumple con los criterios de inclusión, el paciente debe tomar hora urgente con gastroenterología en su consultorio."
        });
      } else {
        functionQueries.InsertStatePatientccr(Id_Patient, "Rechazado", "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que cuenta con un estudio completo realizado, por lo que no necesita otro.");
        if (colonoscopy == 1) {
          res.status(200).json({
            msg: "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que usted cuenta con un estudio completo realizado, por lo que no necesita otro."
          });
        } else {
          functionQueries.InsertStatePatientccr(Id_Patient, "Rechazado", "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que no cumple con los criterios de inclusión");
          res.status(200).json({
            msg: "El paciente NO puede ingresar al programa de detección temprana del cáncer colorectal ya que no cumple con los criterios de inclusión"
          });
        }
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



functionQueries.UpdateEnrollmentSurveyCCR = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var BleedingInStools = req.body.bleedingInStools;
  if (BleedingInStools == null) {
    BleedingInStools = '0';
  }
  var AlterationOfBowelHabits = req.body.alterationOfBowelHabits;
  if (AlterationOfBowelHabits == null) {
    AlterationOfBowelHabits = '0';
  }
  var AbdominalPain = req.body.abdominalPain;
  if (AbdominalPain == null) {
    AbdominalPain = '0';
  }
  var weightLoss = req.body.weightLoss;
  if (weightLoss == null) {
    weightLoss = '0';
  }
  var CaColonRectum = req.body.caColonRectum;
  if (CaColonRectum == null) {
    CaColonRectum = '0';
  }
  var colonoscopy = req.body.colonoscopy;
  if (colonoscopy == null) {
    colonoscopy = '0';
  }
  var colitis = req.body.colitis;
  if (colitis == null) {
    colitis = '0';
  }
  var crohn = req.body.crohn;
  if (crohn == null) {
    crohn = '0';
  }

  connection.tx(function (t) {
    return t.none("UPDATE enrollmentsurveyCCR SET bleeding_in_stools=$1, alteration_of_bowel_habits=$2, abdominal_pain=$3, weight_loss=$4, ca_colon_rectum=$5 WHERE id_patient = $6 ", [BleedingInStools, AlterationOfBowelHabits, AbdominalPain, weightLoss, CaColonRectum, Id_Patient]);
  }).then(function (data) {
    if (BleedingInStools == 0 & AlterationOfBowelHabits == 0 & AbdominalPain == 0 & weightLoss == 0 & CaColonRectum == 0 & colonoscopy == 0 & colitis == 0 & crohn == 0) {
      functionQueries.UpdateStatePatientccr(Id_Patient, "Activo");
      res.status(200).json({
        msg: "Actualizado correctamente."
      });
    }
    else {
      functionQueries.UpdateStatePatientccr(Id_Patient, "Rechazado");
      if (BleedingInStools == 1 | AlterationOfBowelHabits == 1 | AbdominalPain == 1 | weightLoss == 1) {
        res.status(200).json({
          msg: "Actualizado correctamente."
        });
      }
      else {
        if (colonoscopy == 1) {
          res.status(200).json({
            msg: "Actualizado correctamente."
          });
        }
        else {
          res.status(200).json({
            msg: "Actualizado correctamente."
          });
        }
      }
    }
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getListEnrollmentSurveyCCR = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("SELECT * FROM enrollmentsurveyCCR");
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
functionQueries.getEnrollmentSurveyCCRByPatient = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM enrollmentsurveyCCR WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.InsertStatePatientccr = function (IdPatient, State, motivorechazo, next) {//query encargada de ingresar los usuarios

  var State = State;
  var Id_Patient = IdPatient;
  var motivorechazo = motivorechazo;
  connection.tx(function (t) {
    return t.none("insert into patientccr (id_patient, state, motivorechazo) VALUES ($1,$2,$3)", [Id_Patient, State, motivorechazo]);
  })

};
functionQueries.UpdateStatePatientccr = function (IdPatient, State,  next) {//query encargada de ingresar los usuarios

  var State = State;
  var Id_Patient = IdPatient;
  var motivorechazo = motivorechazo;
  connection.tx(function (t) {
    return t.none("update patientccr SET state=$2, motivorechazo=$3 WHERE id_patient =$1", [Id_Patient, State, motivorechazo]);
  })
};
//risk survey   

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
  var otro = req.body.otro;
  var otroreason = req.body.otroreason;

  connection.tx(function (t) {
    return t.none("UPDATE risksurveypathologies SET arterial_hypertension=$1, diabetes=$2, epilepsy=$3, gastric_ulcer=$4, hypo_hyper_thyroidism=$5, operated=$6, operation_reason=$7, cancer=$8, cancer_age=$9, type_cancer=$10, otro=$12, otroreason=$13 WHERE id_patient = $11 ", [arterialHypertension, diabetes, epilepsy, gastricUlcer, hypoHyperThyroidism, operated, operationReason, cancer, cancerAge, typeCancer, idPatient, otro, otroreason]);
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
  var typeactivity = req.body.typeactivity;
  var tipealcohol = req.body.tipealcohol;

  connection.tx(function (t) {
    return t.none("UPDATE risksurveyhabits SET smokes=$1, number_cigarettes=$2, years_smoking=$3, eat_cereal_fiber=$4, drink_alcohol=$5, quantity_alcohol=$6, physical_activity=$7, three_fruits=$8, fried_foods=$9, typeactivity=$11,tipealcohol=$12 WHERE id_patient = $10 ", [smokes, numberCigarettes, yearsSmoking, eatCerealFiber, drinkAlcohol, quantityAlcohol, physicalActivity, threeFruits, friedFoods, idPatient, typeactivity,tipealcohol]);
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

//Exams
functionQueries.RegisterBiopsyCCR = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var result = req.body.result;
  var biopsyDate = req.body.biopsyDate;


  connection.tx(function (t) {
    return t.any("INSERT INTO biopsyccr( id_patient, result, biopsy_date) VALUES ($1,$2,$3) RETURNING id_biopsy", [Id_Patient, result, biopsyDate]);
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
functionQueries.getBiopsyByIdCCR = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM biopsyccr WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.RegisterColoncheck = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var testResult = req.body.testResult;
  var testDate = req.body.testDate;
  var reason = "Colon-check";
  var contact_overdue = "0";
  var contact_tracking = "0";


  connection.tx(function (t) {
    return t.any("INSERT INTO coloncheck(id_patient, test_result, test_date,reason, contact_overdue, contact_tracking ) VALUES ( $1 , $2 , $3,$4,$5,$6) RETURNING id_coloncheck", [Id_Patient, testResult, testDate, reason, contact_overdue, contact_tracking]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado el coloncheck"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getListColoncheckById = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM coloncheck WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.RegisterColonoscopy = function (req, res, next) {//query encargada de ingresar los usuarios

  var Id_Patient = req.body.idPatient;
  var testResult = req.body.testResult;
  var testDate = req.body.testDate;
  var polyps = req.body.polyps;
  var reason = "Colonoscopia";
  var contact = "0";
  var neoplasticLesion = req.body.neoplasticLesion;


  connection.tx(function (t) {
    return t.any("INSERT INTO colonoscopy( id_patient, test_result, test_date, polyps, reason, contact, neoplastic_lesion ) VALUES ( $1 , $2 , $3,$4,$5,$6,$7) RETURNING id_colonoscopy", [Id_Patient, testResult, testDate, polyps, reason, contact, neoplasticLesion]);
  }).then(function (data) {
    res.status(200).json({
      data: data,
      msg: "Se ha ingresado la colonoscopia"
    });
  })["catch"](function (err) {
    res.status(500).json({
      err: err,
      msg: "Ha ocurrido un error"
    });
  });
};
functionQueries.getListColonoscopyById = function (req, res) {//query encargada de obtener al usuario
  var Id_Patient = req.body.idPatient;
  connection.tx(function (t) {
    return t.any("SELECT * FROM colonoscopy WHERE id_patient=$1", [Id_Patient]);
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
functionQueries.colonoscopyDelete = (req, res) => {
  var idColonoscopy = req.body.idColonoscopy;


  connection.tx(t => {
    return t.none("DELETE FROM colonoscopy WHERE id_colonoscopy = $1", [idColonoscopy]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
};
functionQueries.coloncheckDelete = (req, res) => {
  var idColoncheck = req.body.idColoncheck;


  connection.tx(t => {
    return t.none("DELETE FROM coloncheck WHERE id_coloncheck = $1", [idColoncheck]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
};
functionQueries.biopsyCCRDelete = (req, res) => {
  var idBiopsy = req.body.idBiopsy;


  connection.tx(t => {
    return t.none("DELETE FROM biopsyccr WHERE id_biopsy = $1", [idBiopsy]);
  })
    .then(data => {

      res.status(200).json({ msg: "Eliminado correctamente" })
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ha ocurrido un error" })
    })
};

//tracking
functionQueries.UpdateScheduleContactOverdue = function (req, res, next) {//query encargada de ingresar los usuarios

  var id_patient = req.body.idPatient;
  var contact = req.body.contact;
  if (contact == null) {
    contact = '0'
  }


  connection.tx(function (t) {
    return t.none("UPDATE schedulepatients SET contact=$1 WHERE rut = (select rut from patient where id_patient=$2)", [contact, id_patient]);
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
functionQueries.UpdateScheduleContactTracking = function (req, res, next) {//query encargada de ingresar los usuarios

  var id_patient = req.body.id_patient;
  var contact = req.body.contact;

  connection.tx(function (t) {
    return t.none("UPDATE coloncheck SET contact_tracking=$1 WHERE id_patient = $2", [contact, id_patient]);
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
functionQueries.GetScheduleOverdue = function (req, res) {//query encargada de obtener al usuario
  var overdue = new Date();
  overdue.setDate(overdue.getDate() - 2);
  connection.tx(function (t) {
    return t.any("select pat.id_patient, pat.name, pat.last_name, pat.last_name2, pat.cellphone,pat.emergency_phone, pat.mail, sche.start, schepat.contact from patient as pat left join coloncheck as col on pat.id_patient = col.id_patient join schedulepatients as schepat on schepat.rut = pat.rut join schedule as sche on sche.id_schedule = schepat.id_schedule, patientccr as patccr where col.id_patient is null and patccr.state ='Activo' and pat.id_patient = patccr.id_patient and sche.start < $1 ", [overdue]);
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
functionQueries.GetScheduleTracking = function (req, res) {//query encargada de obtener al usuario
  var overdue = new Date();
  overdue.setDate(overdue.getDate() - 744);
  connection.tx(function (t) {
    return t.any("select col.id_patient,pat.name, pat.last_name, pat.last_name2, pat.cellphone, pat.emergency_phone, pat.mail, col.test_date, col.contact_tracking as contact from coloncheck as col, (select col.id_patient as id_patient, max(col.test_date) as max_date from coloncheck as col group by id_patient) as datos, patient as pat, patientccr as patccr where col.test_date = datos.max_date and pat.id_patient = col.id_patient and datos.id_patient = col.id_patient and patccr.state ='Activo' and pat.id_patient = patccr.id_patient and col.test_date< $1", [overdue]);
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

functionQueries.UpdatePatientCCR = function (req, res, next) {
  //query encargada de ingresar los usuarios
  var id_patient = req.body.idPatient;
  var state = req.body.state;
  var cancer_detection_date= req.body.cancerDetectionDate;
  var motivorechazo = req.body.motivorechazo;
  if (cancer_detection_date==""){
    cancer_detection_date=null;
  }
  connection.tx(function (t) {
    return t.none("UPDATE patientccr SET state=$2, cancer_detection_date=$3, motivorechazo=$4 WHERE id_patient= $1;", [id_patient, state,cancer_detection_date, motivorechazo]);
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


functionQueries.getAlcohol = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("Select alcohol from alcoholtype order by alcohol  ");
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


export default functionQueries;