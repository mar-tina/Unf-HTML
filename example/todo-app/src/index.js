import {
  UNF,
  html
} from "../../../src";
import "./components/test.js";

let props = {
  name: "All props"
};

let newtemplate = html `
  <div>
      <test-list props="${props}"> </test-list>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());