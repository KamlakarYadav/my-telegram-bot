let usersRepository = function (pool, log) {

    // Common Services in Used

    this.all = async function () {
        try {
            return await pool.query("call spc_bmf_users_search()", []);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.all", err);
        }
        return null;
    };

    this.get = async function (item) {

        try {
            return await pool.query("call spc_bmf_users_select(?)", [
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
            var sp_text = "SET @out_id = 0; call spc_bmf_users_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(sp_text,
                    [
                        item["id"] != null ? parseInt(item.id) : null,
                        item.first_name,
                        item.last_name,
                        item.email,
                        item.mobile,
                        item.password
                        
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.save", err);
        }
        return null;
    };

    this.delete = async function (item) {
        try {
            return await pool.query("SET @out_id = 0; call spc_bmf_users_delete(?,?,?, @out_id); SELECT @out_id as id;",
                    [
                        item.id,
                        item.done_by,
                        item.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("UserRole.delete", err);
        }
        return null;
    };

    this.checkLogin = async function (item) {
        console.log("servicepoid", item)
        try {
            var sp_text = "call spc_bmf_user_login(?,?,?);";
            return await pool.query(sp_text,
                    [
                        item.email_address,
                        item.password,
                        item.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saveUser.service-saveUser", err);
        }
        return null;
    };

    this.isExistingUser = async function (item) {
        console.log("servicepoid", item);
        try {
            var sp_text = "call spc_bmf_is_user_exists(?);";
            return await pool.query(sp_text,
                    [
                        item.email_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("isExistingUser.service-saveUser", err);
        }
        return null;
    };

    this.resetPassword = async function (item) {
        console.log("servicepoid", item);
        try {
            var sp_text = "SET @out_id = 0; call spc_bmf_reset_password(?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(sp_text,
                    [
                        item.email,
                        item.newPassword,
                        item.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("resetPassword.service-saveUser", err);
        }
        return null;
    };

    this.getApplicationPageRights = async function (item) {

        try {
            return await pool.query("call spc_bmf_user_application_page_rights_select(?)", [
                item.id
            ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("user.service - getApplicationPageRights", err);
        }

        return null;

    };

};

module.exports = usersRepository;