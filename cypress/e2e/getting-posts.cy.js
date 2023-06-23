import { faker } from '@faker-js/faker'

describe(('Getting posts'), () => {

    it('Getting All posts (task 1)', () => {
        cy.log('getting all posts')
        cy.request('GET', '/posts').then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.contain('application/json; charset=utf-8');
        })
    })

    it("Getting first 10 posts (task 2)", () => {
        cy.log('getting first 10 posts')
        cy.request('GET', '/posts?_start=0&_end=10').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(10);
        })
    })

    it("Getting posts by ID (task 3)", () => {
        let id1
        let id2

        do {
            id1 = faker.number.int({ min: 0, max: 50 });
            id2 = faker.number.int({ min: 51, max: 100 });
        } while (id1 === id2);
        cy.log(`getting posts with id ${id1} and ${id2}`)
        cy.request('GET', `/posts?id=${id1}&id=${id2}`).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body[0].id).to.be.equal(id1);
            expect(response.body[1].id).to.be.equal(id2);
        })
    })
})