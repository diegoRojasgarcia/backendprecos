import Promise from 'bluebird';
import pgp from 'pg-promise';
import config from '../config.json'; 
const connectionConf = {
  host: 'ec2-54-208-96-16.compute-1.amazonaws.com',
  port: 5432,
  database: 'd6b25go37c572r',
  user: 'wmshsjzyzgadzl',
  password: '71434d4110e581018f50e1dd3927d0cb45ed02aec05aa9384f2ccb77db9e258c',
  ssl: {
    rejectUnauthorized: false
  }
}
const camelizeColumns = (data) => {
  const template = data[0];

  for (let prop in template) {
    const camel = pgp.utils.camelize(prop);

    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};

const postgres = pgp({promiseLib: Promise, receive: (data, result, e) => { camelizeColumns(data);}
});
const connection = postgres(connectionConf);

export default connection;