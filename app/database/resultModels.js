import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("results.db");

// Function to drop the results table
const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS results;",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Function to create the results table
const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY NOT NULL, result REAL, grade TEXT, module TEXT);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

// Initialize function to drop and then create the table
export const init = async () => {
  try {
    await dropTable();
    await createTable();
    console.log("Initialization complete");
  } catch (err) {
    console.error("Error during initialization:", err);
  }
};


  // return new Promise((resolve, reject) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY NOT NULL, module TEXT);",
  //       [],
  //       () => {
  //         resolve();
  //       },
  //       (_, err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // });



export const insertResult = (resultValue, moduleValue) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO results (result, module) VALUES (?,?);",
        [resultValue, moduleValue],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};



export const fetchResults = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM results;",
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const deleteResult = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM results WHERE id = ?;",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

insertResult("someResultValue", "someGradeValue", "someModuleValue")
  .then((resultSet) => {
    console.log("Data inserted successfully:", resultSet);
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
  });

  insertResult("someResultValue", "someGradeValue", "someModuleValue")
    .then((moduleSet) => {
      console.log("Data inserted successfully:", moduleSet);
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
    });

  // insertResult("someResultValue", "someGradeValue", "someModuleValue")
  //   .then((gradeSet) => {
  //     console.log("Data inserted successfully:", gradeSet);
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting data:", err);
  //   });

    


