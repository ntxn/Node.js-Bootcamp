module.exports = (requestBody, allowedUpdates) => {
  return Object.keys(requestBody).every((update) =>
    allowedUpdates.includes(update)
  );
};
