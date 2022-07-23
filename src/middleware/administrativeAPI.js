import connection from './postgresConnection.js';


const functionQueries = {};

//Administrative user
functionQueries.getProfession = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT * FROM profession ");
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
functionQueries.getPrivilege = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT * FROM privilege ");
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
functionQueries.getSpecialization = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT * from specialization");
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

//Administrative patient
functionQueries.getNationality = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT GENTILICIO_NAC FROM nationality ");
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
functionQueries.getFonasa = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT stretch FROM fonasa ");
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
functionQueries.getMaritalStatus = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT status from maritalStatus");
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
functionQueries.getRegion = function (req, res) {//query encargada de obtener al usuario
  var XMLHttpRequest = require('xhr2');
  let xhr = new XMLHttpRequest();
  xhr.open('get', `https://apis.digital.gob.cl/dpa/regiones`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      let data = xhr.response;
      res.status(200).json({
        data: data
      });

    } else {
      res.status(500).json({
        msg: "Ha ocurrido un error"
      });
    }
  })
  xhr.send();
};
functionQueries.getCommuneByRegion = function (req, res) {//query encargada de obtener al usuario
  var XMLHttpRequest = require('xhr2');
  let codigo = req.body.codigo;
  let xhr = new XMLHttpRequest();
  xhr.open('get', `https://apis.digital.gob.cl/dpa/regiones/${codigo}/comunas`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      let data = xhr.response;
      res.status(200).json({
        data: data
      });

    } else {
      res.status(500).json({
        msg: "Ha ocurrido un error"
      });
    }
  })
  xhr.send();
};


functionQueries.getCesfam = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("SELECT cesfam from cesfam");
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


functionQueries.getPActivity = function (req, res) {//query encargada de obtener al usuario
  connection.tx(function (t) {
    return t.any("SELECT activity from pcactivity order by activity");
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



//Administrative survey
functionQueries.getSurveyCBP = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT type, msg, name from surveyCBP");
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
functionQueries.getSurveyCCR = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT type, msg, name from surveyCCR order by id_survey");
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

//Administrative cbp
functionQueries.getBiopsyType = function (req, res) {//query encargada de obtener al usuario

  connection.tx(function (t) {
    return t.any("SELECT type from biopsyType");
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