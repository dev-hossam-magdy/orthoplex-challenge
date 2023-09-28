// Config
const sqlFun = require("../config/sql-fun");

// Util
const { logsTableName } = require("../../util/database-tables-name");

exports.insert = async (log) => {
  sqlFun.insert(logsTableName, {
    end_point: `${log.endPoint}`,
    method: `${log.method}`,
    body: `${JSON.stringify(log.body)}`,
    auth_token: `${log.token}`,
  });
};
