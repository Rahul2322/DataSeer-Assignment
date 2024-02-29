const db = require('../models')

exports.db = ()=>{
    db.sequelize.sync().then(function () {
        server.listen(port, function () {
          console.log('Express server listening on port ' , port );
        });
        server.on('error', onError);
        server.on('listening', onListening);
      })
}