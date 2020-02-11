export const html = (strings, ...args) => ({
  doc: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let UNF = UNF || {};

UNF.Core = (function() {
  let init = function(selector, component) {
    let el = document.querySelector(selector);
    el.attachShadow({ mode: "open" });

    el.shadowRoot.innerHTML = component.doc;
  };

  var uPublic = {
    init: init
  };

  return uPublic;
})();

UNF.Base = (function() {
  let createElement = args => {
    let classInstance = {};
    let BaseElement = {
      data: args.data,
      methods: args.methods,
      template: args.template
    };

    classInstance = class extends HTMLElement {
      constructor() {
        super();

        const renderTemplate = document.createElement("template");
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._container = new Map();
        this._variables = {};

        renderTemplate.innerHTML = BaseElement.template.doc;
        this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));
        UNF.Events.registerEvents(this, BaseElement.methods);
      }
    };

    BaseElement.ci = classInstance;

    return BaseElement;
  };

  let render = (tagName, component) => {
    customElements.define(tagName, component);
  };

  let getElement = (elem, elID) => {
    elem._variables[`${elID}`] = elem._shadowRoot.querySelector(`#${elID}`);

    return elem._variables[`${elID}`];
  };

  let addListener = (type, elem, f) => {
    elem[`${type}`] = f;
  };

  let bPublic = {
    createElement: createElement,
    render: render,
    getElement: getElement,
    addListener: addListener
  };

  return bPublic;
})();


