var _                 = require('lodash');
var fromJS            = require('immutable').fromJS;
var seamlessImmutable = require('seamless-immutable');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var constants         = require('../../../constants');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  if (!addedRecord._id) throw new Error('Expected record to have client generated _id attribute.');

  var records = _.reject(current.records, function(record) {
    var recordKey = record;
    var isSameKey = addedRecord._id === recordKey;
    return isSameKey;
  });

  records = _.uniq(records);

  var recordsById = _.map(records, function(record) {
    return current.recordsById[record];
  });

  // Prepare state
  var state = {
    records: records,
    recordsById: recordsById
  };

  switch(config.store) {
    case constants.STORE_MUTABLE:
      return state;
    case constants.STORE_IMMUTABLE:
      return fromJS(state);
    default:
      return seamlessImmutable(state);
  }

}

module.exports = error;
