import { UNF, html } from "../../../src";
import "./components/todo.js";



let newtemplate = html`
  <div>
    Hello world
    <div>
      <todo-app></todo-app>
    </div>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());
