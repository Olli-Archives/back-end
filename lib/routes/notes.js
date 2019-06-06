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
    try {
      const noteToBeDeleted = await Note
        .findById(req.params.id);    
      if(noteToBeDeleted){
        const deletedNote = await Note
          .findByIdAndDelete(req.params.id)
          .select({
            _id:true
          })
          .lean();
        res.send(deletedNote);
      }
      const error = new Error('Failed to delete, note by this ID does not exist');
      res.send({});
      next(error);
    } catch(error){
      next(error);
    }
  });

