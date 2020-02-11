import { UNF, html } from "../../../src";
import "./components/test.js";

let newtemplate = html`
  <div>
    Hello world
    <div>
      <test-list> </test-list>
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());
