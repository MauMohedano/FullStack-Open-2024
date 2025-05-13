const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'El nombre del autor debe tener al menos 3 caracteres'],
  },
  born: {
    type: Number,
  },
});

module.exports = mongoose.model('Author', authorSchema);