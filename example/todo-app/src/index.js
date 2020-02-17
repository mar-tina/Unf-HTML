import {
  UNF,
  html
} from '../../../dist/index.js';

let newtemplate = html `
  <div>
      <todo-app> </todo-app>
  </div>
`;

const myTemplate = () => newtemplate;

UNF.Core.init("#app", myTemplate());