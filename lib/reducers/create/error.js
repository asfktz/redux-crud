var _                 = require('lodash');
var seamlessImmutable = require('seamless-immutable');
var assertNotArray    = require('../../utils/assertNotArray');
var constants         = require('../../../constants');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

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

  return seamlessImmutable({
    records: records,
    recordsById: recordsById
  });

}

module.exports = error;
