
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

    this.save = async function (Params) {

        try {
            var sp_text = "SET @out_id = 0; call spc_tg_common_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(sp_text,
                    [
                        item["id"] != null ? parseInt(item.id) : null,
                        item.group,
                        item.name,
                        item.company,
                        item.date,
                        item.members
                        
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.save", err);
        }
        return null;
        
    };

};

module.exports = commonRepository;