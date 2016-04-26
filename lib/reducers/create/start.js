var _                 = require('lodash');
var shortid           = require('shortid');
var constants         = require('../../../constants');
var assertNotArray    = require('../../utils/assertNotArray');
var seamlessImmutable = require('seamless-immutable');

function start(config, current, record) {
  var reducerName = 'createStart';

  assertNotArray(config, reducerName, record);

  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  // Merge record with status
  record = [_.assign({}, record, recordStatus)];

  if (!record._id) throw new Error('Expected record to have client generated _id attribute.');

  return seamlessImmutable({
    records: _.uniq(_.merge(current.records, _.map(record, '_id'))),
    recordsById: _.merge(current.recordsById, _.keyBy(record, '_id'))
  });

}

module.exports = start;
