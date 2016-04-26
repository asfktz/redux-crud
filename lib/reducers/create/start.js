var _                 = require('lodash');
var shortid           = require('shortid');
var constants         = require('../../../constants');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var mergeMutable      = require('../../utils/mergeMutable');
var fromJS            = require('immutable').fromJS;
var seamlessImmutable = require('seamless-immutable');

function start(config, current, record) {
  var reducerName = 'createStart';
  assertNotArray(config, reducerName, record);

  record = common(config, current, record, reducerName);
  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  // Merge record with status
  record = [_.assign({}, record, recordStatus)];

  if (!record._id) throw new Error('Expected record to have client generated _id attribute.');

  // Prepare state
  var state = {
    records: _.uniq(_.merge(current.records, _.map(record, '_id'))),
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
