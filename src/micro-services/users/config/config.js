const MONGO_URI = process.env.MONGO_URL || 'mongodb+srv://dbusername:pass1234@cluster0.r26guxu.mongodb.net/users?retryWrites=true&w=majority';
const PORT = process.env.PORT || 1000;
const IP = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'jkl!±@£!@ghj1237';
module.exports = {
  MONGO_URI,
  PORT,
  IP,
  JWT_SECRET,
};
