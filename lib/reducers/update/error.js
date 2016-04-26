var _                 = require('lodash');
var constants         = require('../../../constants');
var SeamlessImmutable = require('seamless-immutable');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = _.omit(current.recordsById[record._id], 'busy', 'pendingUpdate');

  return SeamlessImmutable({
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });

}

module.exports = error;
