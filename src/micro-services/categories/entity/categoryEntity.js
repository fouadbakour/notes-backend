const category = (title, createdBy) => ({
  getTitle: () => title,
  getCreatedBy: () => createdBy,
});

module.exports = {
  category,
};
