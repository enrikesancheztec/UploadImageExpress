const {Data} = require('../models/data.models');
const mysql = require("mysql");
const util = require('util');

const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const promiseQuery = util.promisify(connection.query).bind(connection);

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

exports.add = async function(data) {
    const sql = "INSERT INTO data (image) value (?)";
    var newId = 0;
    var newData;
    let imageBytes = data.imagen;

    console.log("Original Id: " + data.id);
    console.log("Image Bytes: " + imageBytes);

    try {
        const result = await promiseQuery(sql, imageBytes);
        newId = result.insertId;
        console.log("Inserted newId: " + newId);
    } finally {
        // Close connection?
    }

    if (newId != 0) {
        newData = new Data(newId, imageBytes);
    }

    return newData;     
}

exports.find = async function(id) {
    const sql = "SELECT * FROM data WHERE id = ?";
    var foundData;

    console.log("Id: " + id);

    try {
        const result = await promiseQuery(sql, id);
        console.log("Query finished!");

        if (result.length > 0) {
            foundData = result[0];
        }
    } finally {
        // Close connection?
    }

    return foundData;     
}