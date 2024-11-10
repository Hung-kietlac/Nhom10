const mongoose = require('mongoose');

const diaDanhSchema = new mongoose.Schema({
  madd: String,
  tendd: String,
  mota: String
});

module.exports = mongoose.model('DiaDanh', diaDanhSchema);