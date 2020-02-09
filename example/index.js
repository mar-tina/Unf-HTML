import { UNF } from "../src/element.js";

const newtemplate = html`
  <div>Hello World</div>
`;

const MyTemplate = UNF.createElement("my-template", newtemplate);

MyTemplate.render();

console.log(MyTemplate);
