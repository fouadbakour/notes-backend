const note = (title, category, tags, createdBy) => ({
  getTitle: () => title,
  getCategory: () => category,
  getCreatedBy: () => createdBy,
  getTags: () => tags,
});

module.exports = {
  note,
};
