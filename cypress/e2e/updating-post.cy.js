import user from "../fixtures/user.json";
import { logIn } from "../support/helpers/helpers";
import { faker } from '@faker-js/faker'
import post from '../fixtures/post.json'
import { login } from "../support/helpers/helpers";

describe(('Testing updating post '), () => {

    let sessionData;
    before(() => {
        cy.log('authorization and getting accessToken');
        return login(user).then((data) => {
            sessionData = data;
        });
    });

    it('update non-existing post (task 7)', () => {
        cy.log('updating non-existing post')
        cy.request({
            method: "PUT",
            url: "/posts",
            failOnStatusCode: false,
        }).then(response =>
            expect(response.status).to.be.equal(404)
        )
    })


    it('update post after creating (task 8)', () => {

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

        cy.log("updating post's title")
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
    })
})