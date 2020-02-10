import { UNF, html } from "../src";

let firstName = {};

let initialState = {
  name: "Martina",
  email: "tina@gmail.com"
};

var targetObj = {
  name: "Tinaanan"
};
var targetProxy = new Proxy(firstName, {
  set: function(firstName, key, value) {
    console.log(`${key} set to ${value}`);
    firstName[key] = value;
    return true;
  }
});

const handleInputChange = e => {
  e.preventDefault();
  targetObj.name = e.target.value;
  targetProxy.name = e.target.value;
};

const methods = [
  {
    type: "dom-events",
    all: [
      UNF.Events.registerEvent("onclick", "myuser", () =>
        console.log("Clicked #myuser")
      ),
      UNF.Events.registerEvent("oninput", "first-name", e => {
        handleInputChange(e);
      })
    ]
  },
  {
    type: "cycle-events",
    all: [
      UNF.Events.registerLifeCycle("on-mount", () =>
        console.log("Component did mount")
      ),
      UNF.Events.registerLifeCycle("on-unmount", () =>
        console.log("Component did unmount")
      )
    ]
  },
  {
    type: "state-events",
    all: [UNF.Events.bind("user-details", "first-name", firstName)]
  }
];

let newtemplate = html`
  <div initialState=${initialState} id="myuser">
    Hello This is my user
    <p id="user-details">${firstName.name}</p>

    <div>
      <input id="first-name" initialState=${initialState} value="" />
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.render("user-component", myTemplate(), methods);
