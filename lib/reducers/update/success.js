var _                 = require('lodash');
var constants         = require('../../../constants');
var SeamlessImmutable = require('seamless-immutable');

function success(config, current, record) {
  var reducerName = 'updateSuccess';

  // mark record as unsaved and busy
  return SeamlessImmutable({
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });
}

module.exports = success;
