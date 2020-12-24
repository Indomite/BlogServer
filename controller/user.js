const {
    exec
} = require('../db/mysql')

const register = async (userData = {}) => {
    const username = userData.username
    const password = userData.password
    const email = userData.email
    const sql = `
        insert into user (role_id,username,password,email,avatar_url,access_token,status) values ('10','${username}','${password}','${email}',' ',' ','1')
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const login = async (username, password) => {
    // username = escape(username)
    // password = escape(password)
    const sql = `select * from user where username='${username}' and password='${password}'`
    const rows = await exec(sql);
    console.log(rows[0].username);
    return rows[0]
}

module.exports = {
    register,
    login
}