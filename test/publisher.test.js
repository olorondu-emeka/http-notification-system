import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import publisher from '../server/publisher';

chai.use(chaiHttp);

describe('Publisher tests', () => {
  it('should successfully publish data to subscriber(s)', async () => {
    const response = await chai
      .request(publisher)
      .post('/publish/topic1')
      .send({ mssage: 'Welcome to topic1' });

    expect(response).to.have.status(200);
  });

  it('should throw a 400 error for incomplete parameters', async () => {
    const responseForEmptyBody = await chai
      .request(publisher)
      .post('/publish/topic1')
      .send({});

    // const emptyString = '';
    // const responseForEmpptyTopic = await chai
    //   .request(publisher)
    //   .post(`/publish/${emptyString}`)
    //   .send({ mssage: 'Welcome to topic1' });

    // expect(responseForEmpptyTopic).to.have.status(400);
    expect(responseForEmptyBody).to.have.status(400);
  });

  it('should throw a 404 error for a non-existent route', async () => {
    const response = await chai
      .request(publisher)
      .post('/bad-route')
      .send({ mssage: 'Welcome to topic1' });

    expect(response).to.have.status(404);
  });
});
