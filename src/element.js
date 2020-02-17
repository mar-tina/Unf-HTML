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

        renderTemplate.innerHTML = BaseElement.template.doc;
        this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));
        UNF.Events.registerEvents(this, BaseElement.methods);

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


// HANDLING EVENTS

UNF.Events = (function () {
  /**
   * Passes the 'this' object to all the executing functions when node is mounted or unmounted
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {function} f - onmount function to be called in the connectedCallback function
   */
  let bindCycle = (elem, f) => {
    if (typeof f !== "undefined") {
      f(elem);
    } else {
      console.log("Onmount is undefined");
    }
  };

  /**
   * Passes the 'this' object to all the executing functions providing reference to the current execution context
   * @param {THIS} elem - object that has reference to the current execution context
   * @param {*} args - methods object passed from the UI
   */
  let registerEvents = (elem, args) => {
    if (isEmpty(args)) {
      console.log("There are no events", args);
    } else {
      let arrayOfFuncs = Object.values(args);
      arrayOfFuncs.forEach(func => {
        func(elem);
      });
    }
  };

  let rerender = (elem, content) => {
    //The divs are separated by commas that appear in the UI this replaces them with " " shown in the ui.
    let res = content.doc.replace(/,/g, " ");
    elem.innerHTML = res;
  };

  let bindRenderToStateChange = (ctx, elID, component, state) => {
    // let docToBind = UNF.Base.getELement(ctx, elID);
    let docToRerender = UNF.Base.getElement(ctx, elID);
    let res = component(state)
    if (res.doc === undefined) {
      UNF.Events.rerender(docToRerender, html `<div> </div>,`)
    }
    UNF.Events.rerender(docToRerender, component(state))
  }

  var ePublic = {
    registerEvents: registerEvents,
    bindCycle: bindCycle,
    rerender: rerender,
    bindRenderToStateChange: bindRenderToStateChange
  };

  return ePublic;
})();

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}


// HANDLING INIT
var baseApp = {
  data: {},

  methods: {
    useState: function (ctx) {
      return `Context with state ${ctx}`
    }
  },

  lifecycle: {
    onMount: function (ctx) {
      console.log("mounted context");
    },
  },

  template: () => html `
    <div> Is a todo noooe </div>
  `,

};

let base = UNF.Base.createElement(baseApp);
export let unfBaseElement = base;