const convertArrayToCsv = (arr) => {
  let csvContent = '';
  arr.forEach((infoArray, index) => {
    const dataString = infoArray.join(',');
    csvContent += index < arr.length ? dataString+ "\n" : dataString;
  }); 
  return csvContent;
}

const arrangeDataToCsv = (data, headers = ['row_id', 'vehicle_id', 'latitude', 'longitude', 'distance_from_prev_point', 'worker_id']) => {
  const arrangedData = [];
  arrangedData.push(headers);
  data.forEach(obj => {
    const arr = [];
    for (let i = 0; i < headers.length; i++) {
      arr.push(obj[headers[i]]);
    }
    arrangedData.push(arr);
  });  
  let csvContent = convertArrayToCsv(arrangedData);
  return csvContent;
}

const groupBy = (xs, key) => {
  const res = xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
  }, {});
  return res;
};
  

module.exports = {
  arrangeDataToCsv,
  groupBy
}