const html = (strings, ...args) =>
  strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  );

class UNF extends HTMLElement {
  createElement = function(tagName, template) {
    let doc = document.createElement("template");
    let element = {
      render: () => {
        doc.innerHTML = template;
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(doc.content.cloneNode(true));
        customElements.define(tagName, this);
      }
    };

    return element;
  };
}
