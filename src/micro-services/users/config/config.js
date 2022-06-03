const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/notes-app';
const PORT = process.env.PORT || 1000;
const IP = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'jkl!±@£!@ghj1237';
const JWT_LIFESPAN = process.env.JWT_LIFESPAN || '1d';
module.exports = {
  MONGO_URI,
  PORT,
  IP,
  JWT_SECRET,
  JWT_LIFESPAN,
};
