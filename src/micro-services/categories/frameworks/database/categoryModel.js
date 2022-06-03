const mongoose = require('mongoose');

// Define the model's collection name
const collectionName = 'categories';

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

const CategoryModel = mongoose.model(collectionName, CategorySchema);

module.exports = CategoryModel;
