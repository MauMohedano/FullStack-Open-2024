const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'El título del libro debe tener al menos 3 caracteres'],
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{
    type: String,
  }],
});

module.exports = mongoose.model('Book', bookSchema);
