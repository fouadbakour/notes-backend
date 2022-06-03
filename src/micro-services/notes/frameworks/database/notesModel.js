const mongoose = require('mongoose');

// Define the model's collection name
const collectionName = 'notes';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  tags: {
    type: [{
      type: String,
    }],
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

NoteSchema.index({ title: 'text', tags: 'text', createdBy: 'text' });

const NoteModel = mongoose.model(collectionName, NoteSchema);

NoteModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = NoteModel;
