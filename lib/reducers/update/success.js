var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');
var fromJS            = require('immutable').fromJS;
var seamlessImmutable = require('seamless-immutable');

function success(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

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

module.exports = success;
