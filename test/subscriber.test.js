import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import subscriber from '../server/subscriber';

chai.use(chaiHttp);

describe('Subscriber tests (printMessage)', () => {
  it('should successfully receive a published message', async () => {
    const response = await chai
      .request(subscriber)
      .post('/test1?url=http://localhost:8000/test1')
      .send({ topic: 'newTopic', data: { message: 'Hello!' } });

    expect(response).to.have.status(200);
  });

  it('should throw a 400 error for incomplete request body', async () => {
    const responseForEmptyBody = await chai
      .request(subscriber)
      .post('/test1?url=http://localhost:8000/test1')
      .send({});

    const responseForBodyWithoutTopic = await chai
      .request(subscriber)
      .post('/test1?url=http://localhost:8000/test1')
      .send({ data: { message: 'Hello!' } });

    const responseForBodyWithoutData = await chai
      .request(subscriber)
      .post('/test1?url=http://localhost:8000/test1')
      .send({ topic: 'newTopic' });

    expect(responseForEmptyBody).to.have.status(400);
    expect(responseForBodyWithoutTopic).to.have.status(400);
    expect(responseForBodyWithoutData).to.have.status(400);
  });
});
