var _                 = require('lodash');
var SeamlessImmutable = require('seamless-immutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  // mark record as unsaved and busy
  var recordStatus = {
    deleted: true,
    busy:    true,
  };

  record = _.merge(record, recordStatus);
      
  return SeamlessImmutable({
    records: current.records,
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });

}

module.exports = start;
