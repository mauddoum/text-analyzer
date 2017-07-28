'use strict';

module.exports = function(Text) {

  Text.getStatistics = function(id, cb) {

    Text.findById(id, (err, text) => {
      if (text===null) {
        let err = new Error('Model not found');
        err.statusCode = 404;
        return cb(err);
      }

      var txtArray = text.text.split('');
      var textLength = txtArray.length;

      if (textLength == 0){
        return cb(null, {});
      }

      let stats = txtArray.reduce((acc, chr) => {
        acc[chr] = (acc[chr] ? acc[chr] : 0) + 1;

        return acc;
      }, {});

      Object.keys(stats).forEach((key) => {
        stats[key] = stats[key]/textLength;
      });

      return cb(null, stats);
    })
  }

  Text.remoteMethod('getStatistics', {
    description: 'Get statistics for a Text instance identified by {{id}} from the data source.',
    accessType: 'READ',
    accepts: [
      {arg: 'id', type: 'any', description: 'Model id', required: true,
        http: {source: 'path'}},
    ],
    returns: {arg: 'data', type: 'object', root: true},
    http: {verb: 'get', path: '/getStatistics/:id'},
  });
};
