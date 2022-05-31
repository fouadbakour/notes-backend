const user = (password, email, createdAt) => ({
  getPassword: () => password,
  getEmail: () => email,
  getCreatedAt: () => createdAt,
});

module.exports = {
  user,
};
