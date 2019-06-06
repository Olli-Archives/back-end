const { getAgent } = require('./data-helpers');


describe('notes routes', () => {
  it('can create a note', async() => {
    const note = await getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'test title',
        body: 'test body'
      });

    expect(note.body).toEqual({
      title: 'test title',
      body: 'test body',
      _id: expect.any(String),
      __v: 0
    });

  });
  it('can get all notes', async() => {
    await getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'test title',
        body: 'test body'
      });
    const notes = await getAgent()
      .get('/api/v1/notes');

    expect(notes.body).toHaveLength(1);

  });
  it('can delete note by id', async() => {
    await getAgent()
      .post('/api/v1/notes')
      .send({
        title: 'test title',
        body: 'test body'
      });
    const notes = await getAgent()
      .get('/api/v1/notes');
    const id = notes.body[0]._id;
    const deleted = await getAgent()
      .delete(`/api/v1/notes/${id}`);

    expect(deleted.body).toEqual({
      _id: expect.any(String)
    });
  });
})
;
