require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const agent = request.agent(app);

beforeAll(async() => {
  //connects to mongo db
  await connect();
});

beforeEach(async() => {
  await mongoose.connection.dropDatabase();
});

afterAll(async() => {
  await mongoose.connection.close();
});



module.exports = {

  getAgent: () => agent
};
