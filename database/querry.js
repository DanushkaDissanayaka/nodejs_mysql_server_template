/**
 * 
 */
const databaseName = "weatherStation" // your database name

/**
 * 
 */
const querry = {
    /**
     * querry for create database
     */
    createDatabase: "CREATE DATABASE " + databaseName,
    /**
     * create your all table and the sql qurrey related to tables
     */
    station: {
        /**
         * table creating querry
         */
        createTable: "CREATE TABLE station (" +
            "name varchar(30)" +
            ")",
        /**
         * data insertiong querry
         */
        insertData: ""
        /**
         * keep add querry from heree
         */
    }
    /**
     * maybe another querry 
     * or table creation..
     */
}

/** 
 * add here your table creation querry
 * to auto check your tables at the server start
 *  if table is not exists create table
 */
const tableList = [querry.station.createTable]
/**
 * 
 */
module.exports = {
    databaseName: databaseName,
    table: tableList,
    execute: querry,
}