import { agent as request } from 'supertest';
import Setup from '../../src/stup-test/test-setup';
// data mocks
import { user } from "../../mock/users"
//------------------Database--------------//
Setup.inicialize('signup');
//------------------Database--------------//

describe('signin feature', () => {
  it('should get the token', async (done) => {
    await request(Setup.app).post('/signup').send(user);
    const response = await request(Setup.app).post('/signin').send({
        email: user.email,
        password: user.password
    });
    expect(response.body.auth).toBeTruthy()
    done()
  });
  it('should reject to invalid password', async (done) => {
    await request(Setup.app).post('/signup').send(user);
    const response = await request(Setup.app).post('/signin').send({
        email: user.email,
        password: "passwordtest"
    });
    expect(response.body).toEqual({
        auth: false,
        msg: "invalid password"
    })
    done()
  });
  it('should reject (user not found)', async (done) => {
    await request(Setup.app).post('/signup').send(user);
    const response = await request(Setup.app).post('/signin').send({
        email: "usernot@gmail.com",
        password: "passwordtest"
    });
    expect(response.body).toEqual({
        msg: 'user not found'
    })
    done()
  });
});
