
let logRepository = function (pool, log) {

    this.dbErrorLog = async function (procedure, errLog) {

        try 
        {
                console.log(procedure);
                console.log(errLog);
                console.log(errLog.sqlMessage);
                console.log(errLog.sql);

            return await pool.query("call spc_ErrorLog(?,?,?)",
                        [   
                            procedure, 
                            errLog.errno +'|'+ errLog.code +'|'+ errLog.sqlMessage, 
                            errLog.sql
                        ]
            );

        }
        catch (err) {
            console.log('Error is in submitting ErrorLog function : ', err);
        }

        return null;
    }
}

module.exports = logRepository;