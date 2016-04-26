var _                 = require('lodash');
var shortid           = require('shortid');
var constants         = require('../../../constants');
var seamlessImmutable = require('seamless-immutable');

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // Merge an array of keys
  var currentKeys = _.map(current.recordsById, config.key);
  var newKeys = _.map(records, config.key);
  var allKeys = _.uniq(_.merge(currentKeys, newKeys));

  // Prepare keyed records
  var keyedNewRecords = _.keyBy(records, config.key);
  var keyedOldRecords = _.keyBy(current.recordsById, config.key);

  // Create an array of all objects
  var allRecords = _.map(allKeys, function(key) {
    if (keyedNewRecords[key]) return keyedNewRecords[key];
    else if (keyedOldRecords[key]) return keyedOldRecords[key];
  });

  // Assign ids to new objects
  allRecords = _.map(allRecords, function(record) {
    if (record._id) {
      return record;
    } else {
      record._id = shortid.generate();
      return record;
    }
  });

  // Prepare new state
  return seamlessImmutable({
    records: _.map(allRecords, '_id'),
    recordsById: _.keyBy(allRecords, '_id')
  });

}

module.exports = success;
