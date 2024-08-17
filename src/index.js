function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function createNode(el) {
  return document.createElement(el);
}

function append(parent, el) {
  return parent.insertAdjacentHTML("beforeend", el.outerHTML);
}

const combinators = [
  {
    type: "all",
    description: `
     - Se résous quand toutes les promesses sont résolues
      -- Retourne un tableau des différents resultats des promesses
     - Rejet dès qu'une promesse est rejectée
      -- Retourne la valeur de rejet de la promesse
    `,
  },
  {
    type: "any",
    description: `
    - Se résous / reject selon le premier resultat obtenu.
    Retourne la valeur de la 1ere promesse.
    `,
  },
  {
    type: "allSettled",
    description: `
    - Se resous à la fin de toutes les promesses
    Retour: Tableau des valeurs de retour de chaque promesse avec leur status
    `,
  },
  {
    type: "race",
    description: `
    - Se résous / reject selon le premier resultat obtenu.
    Retourne la valeur de la 1ere promesse.
    `,
  },
];

const renderElements = () => {
  const $main = $("#app");
  $main.innerHTML = "";
  const $element = createNode("promise-strategy");
  combinators.forEach((combinator) => {
    $element.setAttribute("type", combinator.type);
    $element.setAttribute("description", combinator.description);
    append($main, $element);
  });
};
window.addEventListener("DOMContentLoaded", async () => {
  renderElements();
  $("a").addEventListener("click", renderElements);
});
