var _                 = require('lodash');
var SeamlessImmutable = require('seamless-immutable');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  var currentRecordsById = _.clone(current.recordsById);

  delete currentRecordsById[record._id];

  var currentRecords = _.keys(currentRecordsById);

  return SeamlessImmutable({
    records: currentRecords,
    recordsById: currentRecordsById
  });

}

module.exports = success;
