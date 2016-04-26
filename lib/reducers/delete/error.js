var _                 = require('lodash');
var SeamlessImmutable = require('seamless-immutable');
var constants         = require('../../../constants');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = _.omit(current.recordsById[record._id], 'busy', 'deleted');

  return SeamlessImmutable({
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });

}

module.exports = error;
