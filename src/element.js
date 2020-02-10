export const html = (strings, ...args) => ({
  template: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let UNF = UNF || {};

UNF.Core = (function() {
  let init = function(selector, component) {
    let el = document.querySelector(selector);
    el.attachShadow({ mode: "open" });

    el.shadowRoot;
    el.shadowRoot.host;

    console.log("THis is the component", component);
    el.shadowRoot.innerHTML = component.template;

    let childNodes = el.shadowRoot.childNodes;

    // childNodes.forEach(element => {
    //   element.onclick = () => console.log("Been clicked");
    //   console.log("The child nodes", element.onclick);
    // });

    console.log("Shadow root props", el.shadowRoot.attributes);
  };

  let render = function(tagName, component, ...args) {
    customElements.define(
      tagName,
      class extends HTMLElement {
        connectedCallback() {
          console.log("Im running");
          console.log(args);

          var container = {};

          if (!Array.isArray(args) || !args.length) {
            console.log("There are no events");
          } else {
            args.map(arg => {
              //   this._`${arg.elementID}` = this._shadowRoot.querySelector(
              //     `#${arg.elementID}`
              //   );
              container[`${arg.elementID}`] = "";

              console.log("THE ID", container);
            });
          }
        }
        constructor() {
          super();
          const renderTemplate = document.createElement("template");
          this._shadowRoot = this.attachShadow({ mode: "open" });

          renderTemplate.innerHTML = component.template;
          console.log("The template", component.prototype);
          this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));

          console.log("Is it even running");
        }
      }
    );
  };

  var uPublic = {
    init: init,
    render: render
  };

  return uPublic;
})();
