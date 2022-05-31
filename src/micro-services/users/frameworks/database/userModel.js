const mongoose = require('mongoose');

// Define the model's collection name
const collectionName = 'User';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: Date,
});

UserSchema.index({ role: 1 });

const UserModel = mongoose.model(collectionName, UserSchema);

UserModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = UserModel;
