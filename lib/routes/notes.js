const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      title,
      body
    } = req.body;
    try {
      const note = await Note.create({ title, body });
      res.send(note);
    } catch(error) {
      next(error);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const note = await Note.find()
        .select({ __v:0 })
        .lean();
      res.send(note);
    } catch(error) {
      next(error);
    }
  })
 
  .delete('/:id', async(req, res, next) =>{
    const deletedNote = await Note
      .findByIdAndDelete(req.params.id)
      .select({
        _id:true
      })
      .lean();
    if(deletedNote){
      res.send(deletedNote);
    } else {
      const error = new Error('Delete failed');
      error.status = 401;
      next(error);
    }
  });

