var _                 = require('lodash');
var fromJS            = require('immutable').fromJS;
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  // mark record as unsaved and busy
  var recordStatus = {
    deleted: true,
    busy:    true,
  };

  record = _.merge(record, recordStatus);

  // Prepare state
  var state = {
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
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

module.exports = start;
