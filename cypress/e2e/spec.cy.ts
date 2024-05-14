describe('CREATE USER', () => {
  it('Visits the create user page', () => {
    cy.visit('/home/create-user');
    cy.get('h1').contains('Create User Form');
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john.doe@test.com');
    cy.get('#createUserButton').click();
    cy.on('window:alert', txt => {
      expect(txt).to.contains('Form submitted');
    });
  });
});
