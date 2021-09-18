const { threadId, parentPort } = require('worker_threads');
const geolib = require('geolib');

const calcDistance = (location1, location2) => {
  const distance = geolib.getDistance(location1, location2);
  return distance;
};

parentPort.on('message', (data) => {
  const results = data && data.map((value, i) => {
  const newVal = value;
  newVal.worker_id = threadId;
  if ( i === 0) {
    newVal.distance_from_prev_point = null;
  } else {
    newVal.distance_from_prev_point =
      calcDistance({ latitude: value.latitude , longitude: value.longitude },
        { latitude: data[i-1].latitude , longitude: data[i-1].longitude }
      ) || 0;
    }
    return newVal;
  });  
  parentPort.postMessage(results);
});