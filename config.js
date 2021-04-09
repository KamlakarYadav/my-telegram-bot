
let configRepository = function (nconf, setting) {

    var configFile = __dirname + '\\config\\'+ setting.env +'.json';

    nconf.argv().env().file({ file: configFile });

    return {
        nconf : nconf,
        configFile : configFile
    }
}

module.exports = configRepository