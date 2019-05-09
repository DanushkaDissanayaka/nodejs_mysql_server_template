const mysql = require('mysql');
const databaseConfig = require('../config/databaseConfig'); // config file to connect mysql
const query = require('./querry');
/**
 * create connection to mysql database
 */
const con = mysql.createConnection(databaseConfig.connectionConfig);

/**
 * connect my sql database
 */
const connect = function () {
    con.connect(function (err) {
        if (err) throw err; // throw error if connection was not created
        else {
            /**
            * if connection is created then 
            * check databse is exist or not 
            * if database is not exits create database
            * */
            con.query(query.execute.createDatabase, function (err, result) {
                if (err) {
                    if (err.errno == 1007) {
                        console.log("database exists");
                    } else {
                        throw err;
                    }
                }
                else {
                    console.log("Database created");
                }
                /**
                 * set data base to connection 
                 * after database validation
                 */
                con.changeUser({ database: query.databaseName }, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        console.log("Connected to mysql database");
                        /**
                         * chaeck all the table available if any of the table is not available 
                         * create new table
                         */
                        query.table.forEach(element => {
                            createTables(element);
                        });
                    }
                });
            });
        }
    });
}


/**
 * this function is used for table creation 
 * at the server startup
 * @param {*} querry table creation querry @example: 'CREATE TABLE USER(name varchar(20)')
 */

const createTables = (querry) => {
    con.query(querry, (err, result) => {
        if (err) {
            if (err.errno == 1050) {
                console.log(err.message);
            }
            else {
                throw err;
            }
        } else {
            console.log(result);
        }
    });
}

/**
 * Export modules
 */
module.exports = {
    connect: connect // connect to sql database
}