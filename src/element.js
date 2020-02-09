export const html = (strings, ...args) =>
  strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  );

export let UNF = UNF || {};

UNF.Core = (function() {
  let init = function(selector, template) {
    const app = document.querySelector(selector);
    let newEl = document.createElement("template");
    newEl.innerHTML = template;
    var clon = newEl.content.cloneNode(true);
    app.appendChild(clon);
  };

  var uPublic = {
    init: init
  };

  return uPublic;
})();
