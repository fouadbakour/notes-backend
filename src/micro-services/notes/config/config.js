const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/notes-app';
const PORT = process.env.PORT || 3000;
const IP = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'jkl!±@£!@ghj1237';
const CATEGORIES_SERVICE = process.env.CATEGORIES_SERVICE || 'http://localhost:2000/api/v1/categories';
module.exports = {
  MONGO_URI,
  PORT,
  IP,
  JWT_SECRET,
  CATEGORIES_SERVICE,
};
