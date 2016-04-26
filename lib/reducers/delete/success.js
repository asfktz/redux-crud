var _                 = require('lodash');
var common            = require('../common');
var fromJS            = require('immutable').fromJS;
var siu               = require('siu');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  var currentRecordsById = _.clone(current.recordsById);

  delete currentRecordsById[record._id];

  var currentRecords = _.keys(currentRecordsById);

  // Prepare state
  var state = {
    records: currentRecords,
    recordsById: currentRecordsById
  };

  // mark record as unsaved and busy
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return state;
    case constants.STORE_IMMUTABLE:
      return fromJS(state);
    default:
      return seamlessImmutable(state);
  }

}

module.exports = success;
