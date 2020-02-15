import {
  html
} from './index.js';

import {
  UNF
} from "./element.js";


let BaseApp = {

  data: {
    food: "milk and cookies",
    diet: "none",
  },

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

  get getState() {
    console.log("WHY", data);
  }

}

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

const onChange = (objToWatch, onChangeFunction) => {};



let base = UNF.Base.createElement(baseApp);
export let unfBaseElement = base;