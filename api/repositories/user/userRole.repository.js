let userRoleRepository = function (pool, log) {

    // Common Services in Used

    this.all = async function () {
        try {
            return await pool.query("call spc_bmr_role_search()", []);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.all", err);
        }
        return null;
    };

    this.get = async function (item) {

        try {
            return await pool.query("call spc_bmr_role_select(?)", [
                item.id
            ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.get", err);
        }

        return null;

    };

    this.save = async function (item) {
        console.log("servicepoid", item)
        try {
            var sp_text = "SET @out_id = 0; call spc_bmr_role_save(?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(sp_text,
                    [
                        item["id"] != null ? parseInt(item.id) : null,
                        item.name,
                        item.description,
                        item.done_by,
                        item.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.save", err);
        }
        return null;
    };

    this.delete = async function (UserRole) {
        try {
            return await pool.query("SET @out_id = 0; call spc_bmr_role_delete(?,?,?, @out_id); SELECT @out_id as id;",
                    [
                        parseInt(UserRole.id),
                        parseInt(UserRole.done_by),
                        UserRole.ip_address,
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.delete", err);
        }
        return null;
    };

};

module.exports = userRoleRepository;