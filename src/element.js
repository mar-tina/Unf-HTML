import onChange from 'on-change';

export const html = (strings, ...args) => ({
  doc: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let UNF = {};

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
      lifecyle: args.lifecycle,
      watcher: {},
    };


    classInstance = class extends HTMLElement {
      connectedCallback() {
        UNF.Events.bindCycle(this, BaseElement.lifecyle.onMount);
      }
      constructor() {
        super();

        const renderTemplate = document.createElement("template");
        this._shadowRoot = this.attachShadow({
          mode: "open"
        });
        this._container = new Map();
        this._variables = {};

        UNF.Events.initState(this, BaseElement.data);
        this.state.watcher = this._onChanged;

        if (isFunction(BaseElement.template)) {
          let res = BaseElement.template();
          renderTemplate.innerHTML = res.doc;
          this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));
          UNF.Events.registerEvents(this, BaseElement.methods);
        } else {
          renderTemplate.innerHTML = BaseElement.template.doc;
          this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));
          UNF.Events.registerEvents(this, BaseElement.methods);
        }
      }

      _onChanged(f, objToWatch) {
        const handler = {
          get: (target, property, receiver) => {
            if (property in target) {
              f();
              console.log(`GET ${property}`);
              return Reflect.get(target, property, receiver);
            }
            return 'Oops! This property does not exist.';
          },
          set: (target, property, value, receiver) => {
            f();
            return Reflect.set(target, property, value);
          }
        };
        return new Proxy(objToWatch, handler);
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
    return component;
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


function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}