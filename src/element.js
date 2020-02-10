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

    el.shadowRoot.innerHTML = component.template;
  };

  let render = function(tagName, component, ...args) {
    customElements.define(
      tagName,
      class extends HTMLElement {
        connectedCallback() {
          console.log(args);
          this._onMount();
        }

        constructor() {
          super();
          const renderTemplate = document.createElement("template");
          this._shadowRoot = this.attachShadow({ mode: "open" });
          this._container = new Map();
          this._variables = {};

          renderTemplate.innerHTML = component.template;
          this._shadowRoot.appendChild(renderTemplate.content.cloneNode(true));

          this._registerEvents();
          this._bindEvents();
        }

        _bindEvents() {
          if (!Array.isArray(args) || !args.length) {
            console.log("There are no events");
          } else {
            args.map(arg => {
              arg.map(z => {
                if (z.type === "state-events") {
                  z.all.map(el => {
                    this._variables[
                      `${el.id}`
                    ] = this._shadowRoot.querySelector(`#${el.id}`);

                    console.log("The div", this._variables[`${el.id}`]);

                    this._variables[
                      `${el.inputID}`
                    ] = this._shadowRoot.querySelector(`#${el.inputID}`);

                    console.log("The input", this._variables[`${el.inputID}`]);

                    this._variables[`${el.inputID}`].onkeyup = () => {
                      this._variables[`${el.id}`].innerText = this._variables[
                        `${el.inputID}`
                      ].value;
                    };
                    this._variables[`${el.inputID}`].onkeydown = () => {
                      this._variables[`${el.id}`].innerText = this._variables[
                        `${el.inputID}`
                      ].value;
                    };
                  });
                }
              });
            });
          }
        }

        _registerEvents() {
          if (!Array.isArray(args) || !args.length) {
            console.log("There are no events");
          } else {
            args.map(arg => {
              arg.map(x => {
                if (x.type === "dom-events") {
                  x.all.map(el => {
                    this._container.set(`${el.elementID}`, el.elementID);
                    this._container.set(`${el.eventName}`, el.eventName);
                    //Get a reference to the element
                    this._variables[
                      this._container.get(`${el.elementID}`)
                    ] = this._shadowRoot.querySelector(`#${el.elementID}`);
                    //create local event var holder
                    let evt = this._container.get(`${el.eventName}`);
                    let tempholder = this._variables[
                      this._container.get(`${el.elementID}`)
                    ];
                    //   Manually set the property for the div
                    //   Why ? Because you cannot dynamically pass the event type
                    //   when calling addEventListener
                    tempholder[`${evt}`] = el.f;
                  });
                  console.log("The variables", this._variables);
                }
              });
            });
          }
        }

        _onMount() {
          args.map(arg => {
            arg.map(y => {
              if (y.type === "cycle-events") {
                y.all.map(el => {
                  if (el.cycleType === "on-mount") {
                    el.f();
                  }
                });
              }
            });
          });
        }

        _onUnMount() {
          args.map(arg => {
            arg.map(y => {
              if (y.type === "cycle-events") {
                y.all.map(el => {
                  if (el.cycleType === "on-unmount") {
                    el.f();
                  }
                });
              }
            });
          });
        }

        disconnectedCallback() {
          this._onUnMount();
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
