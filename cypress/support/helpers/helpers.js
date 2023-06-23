

export function register(user) {
    let requestBody = {
      email: "",
      password: ""
    };
  
    requestBody.email = user.email;
    requestBody.password = user.password;
  
    cy.request('POST', "/register", requestBody).then(response => {
      expect(response.status).to.equal(201);
    });
  }

  export function login(user) {
    let requestBody = {
      email: user.email,
      password: user.password,
    };
  
    return cy.request('POST', '/login', requestBody)
      .its('body.accessToken')
      .then((accessToken) => {
        return { accessToken };
      });
  }