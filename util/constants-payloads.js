const deletePayload = {
  is_deleted: "0",
  is_active: "1",
};
const restorePayload = {
  is_deleted: "1",
  is_active: "0",
};

module.exports = {
  deletePayload,
  restorePayload,
};
