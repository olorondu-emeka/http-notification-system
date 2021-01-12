import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import publisher from '../server/publisher';

chai.use(chaiHttp);

describe('Publisher tests', () => {
  it('should successfully publish data to subscriber(s)', async () => {
    const response = await chai
      .request(publisher)
      .post('/publish/topic1')
      .send({ message: 'Welcome to topic1' });

    expect(response).to.have.status(200);
  });

  it('should throw a 400 error for incomplete parameters', async () => {
    const responseForEmptyBody = await chai
      .request(publisher)
      .post('/publish/topic1')
      .send({});

    expect(responseForEmptyBody).to.have.status(400);
  });

  it('should throw a 404 error for a non-existent route', async () => {
    const response = await chai
      .request(publisher)
      .post('/bad-route')
      .send({ message: 'Welcome to topic1' });

    expect(response).to.have.status(404);
  });
});

describe('Subscriber tests (subscribe)', () => {
  it('should successfully subscribe to a topic', async () => {
    const responseForFirstRoute = await chai
      .request(publisher)
      .post('/subscribe/topic1')
      .send({ url: 'http://localhost:9000/test1' });

    const responseForSecondRoute = await chai
      .request(publisher)
      .post('/subscribe/topic1')
      .send({ url: 'http://localhost:9000/test2' });

    expect(responseForFirstRoute).to.have.status(200);
    expect(responseForSecondRoute).to.have.status(200);
  });

  it('should throw a 409 error for an existing url subscribed to a topic', async () => {
    const response = await chai
      .request(publisher)
      .post('/subscribe/topic1')
      .send({ url: 'http://localhost:9000/test1' });

    expect(response).to.have.status(409);
  });

  it('should throw a 400 error for incomplete request details', async () => {
    const responseForEmptyBody = await chai
      .request(publisher)
      .post('/subscribe/topic1')
      .send({});

    expect(responseForEmptyBody).to.have.status(400);
  });
});
