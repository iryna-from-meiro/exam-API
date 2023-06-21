import user from "../fixtures/user.json";
import { faker } from '@faker-js/faker';
import post from '../fixtures/post.json';
import { login } from "../support/helpers/helpers";

describe(('Testing of deleting post'), () => {
    let sessionData;
    before(() => {
        cy.log('authorization and getting accessToken');
        return login(user).then((data) => {
            sessionData = data;
        });
    });

    it('delete non existing post (task 9)', () => {
        cy.request({
            method: "DELETE",
            url: "/posts",
            failOnStatusCode: false,
        }).then(response =>
            expect(response.status).to.be.equal(404)
        )
    })

    it('Create, Update, Delete post (task 10)', () => {

        post.id = faker.number.int({ max: 10000 })
        post.title = faker.commerce.productName();
        post.title2 = faker.commerce.productName();
        post.body = faker.commerce.productDescription();

        cy.log('creating post')
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

        cy.log('updating posts title')
        cy.request({
            method: 'PUT',
            url: `/664/posts/${post.id}`,
            headers: {
                Authorization: `Bearer ${sessionData.accessToken}`,
            },
            body: {
                id: post.id,
                title: post.title2,
                body: post.body,
            }
        }).then((response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.title).to.be.equal(post.title2)
        });


        cy.log('Deleting post')
        cy.request({
            method: 'DELETE',
            url: `/664/posts/${post.id}`,
            headers: {
                Authorization: `Bearer ${sessionData.accessToken}`,
            }
        }).then((response) => {
            expect(response.status).to.be.equal(200);
        });
    })
})