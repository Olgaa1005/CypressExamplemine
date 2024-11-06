  describe('E2E tester mot HerokuApp', () => {
  
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/')

  })
  /*
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
    */

  it('Test mot FromAuthentification', () => {
    cy.get('a[href*="login"]').click()

    //Matat in värden i form
    cy.get('h2').should('contains.text', 'Login Page')
    cy.get("#username").type("tomsmith")
    cy.get("#password").type("SuperSecretPassword!")

    //Loggar in
    cy.get('button[class="radius"]').click()

    cy.get('h2').should('contains.text', 'Secure Area')

    //Loggar ut
    cy.get('a[href*="login"]').click()
    cy.get('h2').should('contains.text', 'Login Page')

  })

  it('Misslyckad Auth inloggning', () => {
    cy.get('a[href*="login"]').click()

    //Matat in värden i form
    cy.get('h2').should('contains.text', 'Login Page')
    cy.get("#username").type("abcde")
    cy.get("#password").type("12345")

    //Försöker loggar in
    cy.get('button[class="radius"]').click()

    //Inloggning misslyckas, kontrollera statusrad och h2 header
    cy.get('h2').should('contains.text', 'Login Page')
    cy.get("#flash").should("contains.text", "Your username is invalid!")
  })

  it("check and uncheck checkboxes", () => {
    cy.get('a[href*="chechboxes"]').click()

    //var-ref
    //let box1 = cy.get("input[type='checkbox']").eq(0)
    //let box2 = cy.get("input[type='checkbox']").eq(1)


  //Kontrollera initial state
  cy.get("input[type='checkbox']").eq(0).should('not.be.checked')
  cy.get("input[type='checkbox']").eq(1).should('be.checked')

  //User klickar boxes
  cy.get("input[type='checkbox']").eq(0).checked()
  cy.get("input[type='checkbox']").eq(1).unchecked()

   //Kontrollera state efter ändring
   cy.get("input[type='checkbox']").eq(0).should('be.checked')
   cy.get("input[type='checkbox']").eq(1).should('not.be.checked')
    })


   it("Dropdown menu", () => {
    cy.get('[href*="dropdown"]').click()

    //Framme vid Select
    //Välj alternativ 1 
    cy.get("select").select(1)
    cy.get('select option:selected').should('contains.text', "Option 1")

    //Välj alternativ 2
    cy.get("select").select("Option 2")
    cy.get('select option:selected').should('contains.text', "Option 2")
   })

})