var _                 = require('lodash');
var fromJS            = require('immutable').fromJS;
var common            = require('../common');
var constants         = require('../../../constants');
var mergeMutable      = require('../../utils/mergeMutable');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  record = _.omit(current.recordsById[record._id], 'busy', 'deleted');

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
