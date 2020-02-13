import { UNF, html } from "../../../src";
import "./components/test.js";

let props = {
  name: "All props"
};

let newtemplate = html`
  <div>
    Hello world
    <div>
      <test-list props="${props}"> </test-list>
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());
