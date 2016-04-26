var _                 = require('lodash');
var SeamlessImmutable = require('seamless-immutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'updateStart';

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  record = _.merge(record, recordStatus);

  return SeamlessImmutable({
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });

}

module.exports = start;
