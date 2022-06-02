const mongoose = require('mongoose');

// Define the model's collection name
const collectionName = 'Categories';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

CategorySchema.index({ role: 1 });

const CategoryModel = mongoose.model(collectionName, CategorySchema);

CategoryModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = CategoryModel;
