import user from "../fixtures/user.json";
import { faker } from '@faker-js/faker'
import post from '../fixtures/post.json'
import { login } from "../support/helpers/helpers";

describe(('Testing creating post as unauthorized user'), () => {

    it('tests error appearing if to create post as unauthorized user, (task 4)', () => {
        cy.log('creating post')
        cy.request({
            method: "POST",
            url: "/664/posts",
            failOnStatusCode: false,
        }).then(response =>
            expect(response.status).to.be.equal(401)
        )
    })
})

describe('Testing creating post as authorized user', () => {

    let sessionData;
    before(() => {
        cy.log('registration of user')
        cy.request('POST', '/664/users', user).then((response) => {
            expect(response.status).to.be.equal(201);
        });
        
        cy.log('authorization and getting accessToken');
        return login(user).then((data) => {
            sessionData = data;
        });
    });

    it('create post as authorized user (task 5)', () => {
        cy.log('creating post')
        cy.request({
            method: 'POST',
            url: '/664/posts',
            headers: {
                Authorization: `Bearer ${sessionData.accessToken}`,
            },
        }).then((response) => {
            expect(response.status).to.be.equal(201);
        });
    });

    post.id = faker.number.int({ max: 10000 })
    post.title = faker.commerce.productName();
    post.body = faker.commerce.productDescription();

    it('create post with content (task 6)', () => {
        cy.log(`creating post with title ${post.title} and body ${post.body}`)
        cy.request({
            method: 'POST',
            url: '/664/posts',
            headers: {
                Authorization: `Bearer ${sessionData.accessToken}`,
            },
            body: post,
        }).then((response) => {
            expect(response.status).to.be.equal(201);
            expect(response.body.title).to.be.equal(post.title)
            expect(response.body.body).to.be.equal(post.body)
        });
    });
});