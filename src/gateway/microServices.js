const USERS_SERVICE = process.env.USERS_SERVICE || 'http://localhost:1000';
const CATEGORIES_SERVICE = process.env.CATEGORIES_SERVICE || 'http://localhost:2000';
const NOTES_SERVICE = process.env.NOTES_SERVICE || 'http://localhost:3000';
module.exports = {
  USERS_SERVICE,
  CATEGORIES_SERVICE,
  NOTES_SERVICE,
};
