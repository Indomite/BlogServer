const mysql = require('mysql')
const {
    MYSQ_CONF
} = require('../conf/db')

const con = mysql.createConnection(MYSQ_CONF)

con.connect()

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}