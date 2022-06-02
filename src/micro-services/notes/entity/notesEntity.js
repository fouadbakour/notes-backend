const note = (title, category, tags, createdAt, updatedAt, createdBy) => ({
  getTitle: () => title,
  getCategory: () => category,
  getCreatedBy: () => createdBy,
  getTags: () => tags,
  getCreatedAt: () => createdAt,
  getUpdatedAt: () => updatedAt,
});

module.exports = {
  note,
};
