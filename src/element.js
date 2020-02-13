export const html = (strings, ...args) => ({
  doc: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let UNF = UNF || {};

UNF.Core = (function () {
  /**
   * Initializes the application .
   * @param {string} selector
   * @param {html-template} component
   * @returns {void}
   */
  let init = function (selector, component) {
    let el = document.querySelector(selector);
    el.attachShadow({
      mode: "open"
    });

    el.shadowRoot.innerHTML = component.doc;
  };

  var uPublic = {
    init: init
  };

  return uPublic;
})();

UNF.Base = (function () {
  /**
   *Creates the element and provides a global object that is accessible to the
   component and other parts of the code
   * @param {BaseElement} args
   * @returns {BaseElement} - returns the element passed but with the properties set in the class
   */
  let createElement = args => {
    let classInstance = {};
    let BaseElement = {
      data: args.data,
      methods: args.methods,
      template: args.template,
      lifecyle: args.lifecycle
    };

    classInstance = class extends HTMLElement {
      connectedCallback() {
        UNF.Events.initState(this, BaseElement.data);
        console.log("The lifecycle", BaseElement.lifecyle.onMount);
        UNF.Events.bindCycle(this, BaseElement.lifecyle.onMount);
        // UNF.Events.registerProps(this);
      }
      constructor() {
        super();

        const renderTemplate = document.createElement("template");
        this._shadowRoot = this.attachShadow({
          mode: "open"
        });
        this._container = new Map();
        this._variables = {};

        renderTemplate.innerHTML = BaseElement.template.doc;
        this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));
        UNF.Events.registerEvents(this, BaseElement.methods);
      }

      disconnectedCallback() {
        UNF.Events.bindCycle(this, BaseElement.lifecyle.onUnMount);
      }
    };

    BaseElement.ci = classInstance;

    return BaseElement;
  };

  /**
   * Renders the element to screen by calling define on customElements
   * @param {string} tagName
   * @param {HTMLelement} component
   * @returns {void}
   */
  let render = (tagName, component) => {
    customElements.define(tagName, component);
  };

  
  /**
   * Fetches an element by ID
   * @param {THIS} elem - object with reference to the currenc class in execution
   * @param {string} elID -ID of the element being fetched
   * @returns {HTMLElement}
   */
  let getElement = (elem, elID) => {
    elem._variables[`${elID}`] = elem._shadowRoot.querySelector(`#${elID}`);

    return elem._variables[`${elID}`];
  };

  let bindel = (ctx, elID, ...args) => {};

  /**
   * Listens for events on elements
   * @param {string} type - they type of event to listen to i.e {'onclick'}
   * @param {HTMLElement} elem - the element resulting from calling getELement
   * @param {function} f - The function that executes when event occurs
   * @returns {void}
   */
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