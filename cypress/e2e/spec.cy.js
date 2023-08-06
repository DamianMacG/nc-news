describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://luminous-druid-1cc7bd.netlify.app/");

    cy.contains("Welcome to DG NEWS");
    cy.contains("Stay tuned.");
    cy.get("button").contains("ENTER").click();
    cy.contains("Choose a Topic:");
    cy.get("select#topic").select("football").should("have.value", "football");

    cy.contains("Sort by:");
    cy.contains("Agility Training").click();
    cy.get("button").contains("Up Vote").click();

    const commentText = "This is a test comment.";
    cy.get('textarea[name="comment"]')
      .type(commentText)
      .should("have.value", commentText);
    cy.get('button[type="submit"]').click();
    cy.contains(commentText)
    cy.get("p").contains(commentText)
    cy.get("button").contains("Delete").click();
    cy.contains(commentText).should('not.exist');
    cy.get('textarea[name="comment"]').should("have.value", "");
  });
});
