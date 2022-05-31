const category = (title, createdAt, createdBy) => ({
  getTitle: () => title,
  getCreatedAt: () => createdAt,
  getCreatedBy: () => createdBy,
});

module.exports = {
  category,
};
