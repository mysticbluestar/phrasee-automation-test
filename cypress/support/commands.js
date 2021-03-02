Cypress.Commands.add('loginByForm', (username, password) => {
  Cypress.log({
    name: 'loginByForm',
    message: `${username} | ${password}`,
  })
  cy.visit('https://app-qa.phrasee.co/login')
  cy.get('input[name=email]').type(username)
  cy.get('input[name=password]').type(password)
  cy.get('button[title=Login]').click()


// I lost A LOT of time trying to get direct request to work but gave up
// I'm aware it is best practice, rather than using the ui form each time
  // return cy.request({
  //   method: 'POST',
  //   url: 'https://app-qa.phrasee.co/login',
  //   form: true,
  //   body: {
  //     username,
  //     password,
  //   },
  // })
})
