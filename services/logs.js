// Queries
const logsQueries = require("../db/queries/logs");

exports.log = async (requestPayload) => {
  const results = await logsQueries.insert(requestPayload);
  return results;
};
