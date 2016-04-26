var _                 = require('lodash');
var shortid           = require('shortid');
var constants         = require('../../../constants');

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  var currentRecordsById = _.clone(current.recordsById);
  var currentRecords = _.clone(current.records);

  // update existing records
  if (clientGenKey && currentRecordsById[clientGenKey]) {
    currentRecordsById[clientGenKey] = addedRecord;

  } else {
    var newKey = shortid.generate();
    addedRecord._id = newKey;

    currentRecords.push(newKey);
    currentRecordsById[newKey] = addedRecord;
  }

  return seamlessImmutable({
    records: currentRecords,
    recordsById: currentRecordsById
  });
}

module.exports = success;
