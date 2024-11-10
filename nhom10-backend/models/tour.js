const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  matour: Number,
  matp_den: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiaDanh' 
  },
  gia_tien: Number,
  anh: String
});

module.exports = mongoose.model('Tour', tourSchema);