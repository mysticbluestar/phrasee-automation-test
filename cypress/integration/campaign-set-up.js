describe('Set Up Page', () => {
  beforeEach(function () {
    //grab test data from fixture
    cy.fixture('form-values.json')
    .then((formValues) => {
      this.formValues = formValues
    })

    // user credentials could also be loaded from fixtures if many different users should be tested
    // in this case they are hard coded
    const username = 'conrad.greener@phrasee.co'
    const password = 'k#P%3H3Gunoc'

    // login before each test preferably avoid the ui
    cy.loginByForm(username, password)
    //check for successful login
    cy.get('.ant-message-custom-content').should('be.visible')
  })

  it('load fixture data to create campaign with dynamic data', function () {
    // iterate over form values json allowing happy day path test to be run with many different data values

    //access each testFormValue and perform asserts etc using them
    cy.wrap(this.formValues)
    .each(formValue => {

       //setup page
       // best to use specific cypress selectors to avoid flakey tests from html/css changes
       cy.get('[data-cy="create-campaign-mi"]').click()
       cy.get('[data-cy="email"]').click()
       cy.get('[data-cy=campaign-setup-select-project]').type('External automation project{enter}') //in this case value doesn't change
       cy.get('[data-cy=campaign-setup-campaign-name]').type(formValue.campaignName)
       cy.get('[data-cy=campaign-setup-campaign-own-sl]').type(formValue.campaignOwnSl)
       cy.get('[data-cy=campaign-setup-list-size]').type(formValue.campaignListSize)
       cy.get('[data-cy=campaign-setup-baseline-open-rate]').type(formValue.campaignBaselineOpenRate)
       cy.get('[data-cy=campaign-setup-submit-button]').click()

       //language generation page
       // struggled with date picker and ran out of time
      cy.get('[data-cy=date]').type(formValue.campaignDate)
    })
  })

  // testing for form validation.  If i hadn't run out of time this area would be greatly expanded
  it('form elements missing until prerequisits filled in', function () {
    cy.get('[data-cy="create-campaign-mi"]').click()
    cy.get('[data-cy="email"]').click()
    cy.get('[data-cy=campaign-setup-submit-button]').should('not.exist')
  })

  it('form fields appear as prerequisits filled in', function () {
    cy.get('[data-cy="create-campaign-mi"]').click()
    cy.get('[data-cy="email"]').click()
    cy.get('[data-cy=campaign-setup-select-project]').type('External automation project{enter}')
    cy.get('[data-cy=campaign-setup-submit-button]').should('exist')
  })

  it('cant submit empty form', function () {
    cy.get('[data-cy="create-campaign-mi"]').click()
    cy.get('[data-cy="email"]').click()
    cy.get('[data-cy=campaign-setup-select-project]').type('External automation project{enter}')
    cy.get('[data-cy=campaign-setup-submit-button]').should('exist')
    cy.get('[data-cy=campaign-setup-submit-button]').should('be.disabled')
  })

  // test what happens when alphas are input to numeric fields

  // test what happens when numerics are input to alpha fields

  // test what happens when special characters are used


})
