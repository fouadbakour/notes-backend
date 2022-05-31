const user = (username, password, email, role, createdAt) => ({
  getUserName: () => username,
  getPassword: () => password,
  getEmail: () => email,
  getRole: () => role,
  getCreatedAt: () => createdAt,
});
module.exports = {
  user,
};
