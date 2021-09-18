
const csv = require('csvtojson');
const utils = require('../utils');
const WorkerPool = require('./csv.worker_pool');
const { numberOfWorkers } = require('../config');
const os = require('os');

const getData = () => {
  const csvFilePath = __dirname+'/coordinates_for_node_test.csv';
  const data = csv()
    .fromFile(csvFilePath)
    .then((dataArr)=> {
      const dataObj = utils.groupBy(dataArr, 'vehicle_id');
      return dataObj;
    });
  return data;
}

const getCsv = async (req, res) => {
  const data = await getData();  
  const vehiclesArr = data ? Object.keys(data) : [];

  try {
    const pool = new WorkerPool(numberOfWorkers || os.cpus().length);
    let finished = 0;
    let arrRes = [];
    new Promise((resolve, reject) => {
      for (let i = 0; i < (numberOfWorkers || os.cpus().length); i++) {
        pool.runTask(data[vehiclesArr[i]], (err, result) => {
          arrRes = result && result.length ? [...arrRes, ...result] : arrRes;
          if (++finished === (numberOfWorkers || os.cpus().length)) {
            pool.close();
            const csvData = utils.arrangeDataToCsv(arrRes);
            resolve(csvData);
          }
        });
      } 
    })
    .then(csv => {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
      // res.status(200).json(arr) 
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getCsv
}