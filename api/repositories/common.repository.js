
const mysql = require('serverless-mysql')({
  config: {
    host     : '207.180.221.147',
    database : 'db_telegram',
    user     : 'sa',
    password : 'PTS@99remote'
  }
});

let commonRepository = function (pool, log) {    

    this.getAllItem = async function () {
        try {
            return await pool.query("call spc_ion_item_master_search()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        } 
        return null;
    };

    this.getTodaysTotalDsi = async function () {
        try {
            return await pool.query("call spc_tg_common_todays_total_dsi_count()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        } 
        return null;
    };
        
    this.getTodaysGroupwiseTotalDsi = async function () {
        try {
            return await pool.query("call spc_tg_common_todays_groupwise_total_dsi_count()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        } 
        return null;
    };
    
    this.save = async function (Params) {
        console.log('Params: ', Params);
        try {
        console.log('Params1');

        // Run your query
        let results = await mysql.query("call spc_tg_common_todays_total_dsi_count()");

        console.log('pool-query: ', results);
        
//            var sp_text = "SET @out_id = 0; call spc_tg_common_save(?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
//            return await pool.query(sp_text,
//                    [
//                        Params["id"] != null ? parseInt(item.id) : null,
//                        Params.group,
//                        Params.name,
//                        Params.company,
//                        Params.date,
//                        Params.members,
//                        Params.chat_id,
//                        Params.message
//                        
//                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.save", err);
        }
        return null;
        
    };

};

module.exports = commonRepository;