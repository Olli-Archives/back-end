const mongoose = require('mongoose');
const Note = require('../../lib/models/Note');

describe('Note model', ()=>{
  it('has a title, body, and id', ()=>{
    const note = new Note({
      title: 'test title',
      body: 'test body',
    });
    expect(note.toJSON()).toEqual({
      title: 'test title',
      body: 'test body',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('requires title and body', ()=>{
    const note = new Note({});
    const errors = note.validateSync().errors;
    expect(errors.title.message).toEqual('Path `title` is required.');
    expect(errors.body.message).toEqual('Path `body` is required.');
  });
})
;
