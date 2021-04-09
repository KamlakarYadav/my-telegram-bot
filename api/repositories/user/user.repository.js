
let userRepository = function (pool, log) {

    // Common Services in Used

    this.getUsers = async function () {
        try {
            return await pool.query("call spc_bmr_user_search()", []);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("User.service - getUsers", err);
        }
        return null;
    };

    this.getUser = async function (item) {

        try {
            return await pool.query("call spc_bmr_user_select(?)", [
                item.id
            ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("costSheet.service - getUser", err);
        }

        return null;

    };

    this.saveUser = async function (item) {
        console.log("servicepoid", item)
        try {
            var sp_text = "SET @out_id = 0; call spc_bmr_user_save(?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(sp_text,
                    [
                        item["id"] != null ? parseInt(item.id) : null,
                        item.first_name,
                        item.last_name,
                        item.role,
                        item.email_address,
                        item.password,
                        item.done_by,
                        item.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saveUser.service-saveUser", err);
        }
        return null;
    };

    this.deleteUser = async function (User) {
        try {
            return await pool.query("SET @out_id = 0; call spc_bmr_user_delete(?,?,?, @out_id); SELECT @out_id as id;",
                    [
                        parseInt(User.id),
                        parseInt(User.done_by),
                        User.ip_address
                    ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Product.service-deleteUser", err);
        }
        return null;
    };

    this.checkLogin = async function (item) {
        console.log("servicepoid", item)
        try {
            var sp_text = "call spc_bmr_user_login(?,?,?);";
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
            var sp_text = "call spc_bmr_is_user_exists(?);";
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
            var sp_text = "SET @out_id = 0; call spc_bmr_reset_password(?,?,?, @out_id); SELECT @out_id as id;";
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
            return await pool.query("call spc_bmr_user_application_page_rights_select(?)", [
                item.id
            ]);
        } catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("user.service - getApplicationPageRights", err);
        }

        return null;

    };

};

module.exports = userRepository;