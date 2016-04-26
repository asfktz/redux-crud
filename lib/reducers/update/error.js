var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var constants         = require('../../../constants');
var mergeMutable      = require('../../utils/mergeMutable');
var fromJS            = require('immutable').fromJS;
var seamlessImmutable = require('seamless-immutable');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  record = _.omit(current.recordsById[record._id], 'busy', 'pendingUpdate');

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

module.exports = error;
