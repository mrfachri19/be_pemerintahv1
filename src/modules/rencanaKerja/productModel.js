const connection = require("../../config/mysql");

module.exports = {
  getAllProduct: (search, sort, order, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM rencanaKinerja WHERE nama LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
        [`%${search}%`, limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getProductById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM rencanaKinerja WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getCountProduct: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM rencanaKinerja WHERE nama LIKE ?`,
        [`%${search}%`],
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  postProduct: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO rencanaKinerja SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),


};
