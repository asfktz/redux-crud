var _                 = require('lodash');
var shortid           = require('shortid');
var common            = require('../common');
var constants         = require('../../../constants');
var fromJS            = require('immutable').fromJS;

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  addedRecord = common(config, current, addedRecord, reducerName);

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

  var state = {
    records: currentRecords,
    recordsById: currentRecordsById
  }

  switch(config.store) {
    case constants.STORE_MUTABLE:
      return state;
    case constants.STORE_IMMUTABLE:
      return fromJS(state);
    default:
      return seamlessImmutable(state);
  }


  return updatedCollection;
}

module.exports = success;
