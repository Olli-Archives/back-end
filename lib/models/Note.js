
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  id:{
    type:Number,
    required:true
  }
})
;

module.exports = mongoose.model('noteSchema', noteSchema);