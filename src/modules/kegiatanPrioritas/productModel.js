const connection = require("../../config/mysql");

module.exports = {
  getAllProduct: ( sort, order, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM kegiatanPrioritas ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
        [ limit, offset],
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
        "SELECT * FROM kegiatanPrioritas WHERE id = ?",
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
  getCountProduct: () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM kegiatanPrioritas`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
};
