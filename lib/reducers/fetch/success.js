var _                 = require('lodash');
var shortid           = require('shortid');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var makeImmutable     = require('../../utils/makeImmutable');
var isImmutable       = require('../../utils/isImmutableJs');
var wrapArray         = require('../../utils/wrapArray');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');
var fromJS            = require('immutable').fromJS;
var seamlessImmutable = require('seamless-immutable');

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (config.store === constants.STORE_IMMUTABLE) {
    current = current.toJS();
    if (isImmutable(records)) {
      records = records.toJS();
    }
  }

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

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
  var state = {
    records: _.map(allRecords, '_id'),
    recordsById: _.keyBy(allRecords, '_id')
  };

  switch(config.store) {    
    case constants.STORE_MUTABLE:
      return state
    case constants.STORE_IMMUTABLE:
      return fromJS(state);
    default:
      return seamlessImmutable(state);
  }

}

module.exports = success;
