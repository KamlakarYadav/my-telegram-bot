let appRouters = function (env, app, Container) {

    let container = new Container();
    
    container.register('environment', { env: env });
    container.register('bcrypt', require('bcryptjs'));
    container.register('jwt', require('jsonwebtoken'));
    container.register('nconf', require('nconf'));
    container.register('config', require('./config.js'), ['nconf', 'environment']);
    container.register('pool', require('./util/mysql.repository'));
    
    // Start Repositories
    container.register('logRepository', require('./util/log.repository'), ['pool']);
    container.register('oauthRepository', require('./api/auth/oauth.repository'), ['jwt', 'logRepository']);
    container.register('commonRepository', require('./api/repositories/common.repository'), ['pool', 'logRepository' ]);
    container.register('usersRepository', require('./api/repositories/users.repository'), ['pool', 'logRepository' ]);
    // End Repositories

    // Start Services
    container.register('commonService', require('./api/services/common.service'), ['commonRepository', 'oauthRepository', 'logRepository' ]);
    container.register('usersService', require('./api/services/users.service'), ['usersRepository', 'oauthRepository', 'logRepository' ]);        
    // End Services

    // Start Routes
    
    var usersService = container.get('usersService');
    app.use('/users', usersService);
    
    var commonService = container.get('commonService');
    app.use('/common', commonService);

    //  End Routes

};

module.exports = appRouters;