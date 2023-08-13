const connection = require("../../config/mysql");

module.exports = {
  // register: (data) =>
  //   new Promise((resolve, reject) => {
  //     connection.query("INSERT INTO user SET?", data, (error, result) => {
  //       if (!error) {
  //         const newResult = {
  //           id: result.insertId,
  //           ...data,
  //         };
  //         delete newResult.password;
  //         resolve(newResult);
  //       } else {
  //         reject(new Error(`SQL:${error.sqlMessage}`));
  //       }
  //     });
  //   }),
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id = ?",
        id,
        (error, results) => {
          if (!error) {
            const newResults = results;
            // delete newResults[0].password;
            resolve(newResults);
          } else {
            reject(new Error(`Message ${error.message}`));
          }
        }
      );
    }),
  getAllProduct: (search, sort, order, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE nilai LIKE ? ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
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
  getCountProduct: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM user WHERE nilai LIKE ?`,
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

  updateProfile: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE id = ?",
        [data, id],
        (error, results) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`Message ${error.message}`));
          }
        }
      );
    }),
};
