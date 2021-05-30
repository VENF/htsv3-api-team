import { agent as request } from 'supertest';
import Setup from '../../src/stup-test/test-setup';
// data mocks
import { user } from "../../mock/users"
//------------------Database--------------//
Setup.inicialize('signup');
//------------------Database--------------//

describe('signup feature', () => {
  it('register user successfully', async (done) => {
    const response = await request(Setup.app).post('/signup').send({
        ...user,
        email: "armin@gmail.com",
        username: "armin"
    });
    expect(response.body.msg).toMatch("User has been created successfully")
    done()
  });
  it('I should reject the registration (Empty any fields)', async (done) => {
    const response = await request(Setup.app).post('/signup').send({ ...user, email: ""});
    expect(response.body.msg).toMatch("all fields are required")
    done()
  });
  it('I should reject the registration (user already exist)', async (done) => {
    await request(Setup.app).post('/signup').send(user);
    const response = await request(Setup.app).post('/signup').send(user);
    expect(response.body.msg).toMatch("this user already exist")
    done()
  });
});
