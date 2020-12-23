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

// const login = async ()

module.exports = {
    register
}