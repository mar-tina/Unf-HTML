import { UNF, html } from "../../../../src";

let BaseEL = {
  data: {
    name: "Tina",
    email: "tina@gmail"
  },
  methods: {
    loadData: function(elem) {
      return "Loaded data";
    },
    handleClick: function(elem) {
      let resEL = UNF.Base.getElement(elem, "hello-test");
      UNF.Base.addListener("onclick", resEL, () => console.log("Clicking div"));
    }
  }
};

let testTemplate = html`
  <div id="hello-test">Hello Test World</div>
`;

BaseEL.template = testTemplate;

let base = UNF.Base.createElement(BaseEL);

UNF.Base.render("test-list", base.ci);
