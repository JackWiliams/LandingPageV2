import { DROPDOWN } from "../constants";
import template from "./template";
import style from "./style";

export default editor => {
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType(DROPDOWN, {
    model: {
      defaults: {
        name: "Dropdown",
        classes: ["dropdown"],
        script: function() {
          const el = this;
          el.onclick = function(e) {
            if (e.target.matches(".dropdown-toggle")) {
              el.classList.toggle("show");
              el.querySelector(".dropdown-menu").classList.toggle("show");
            }
          };
        }
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`dropdown`) && createCssStyles();
        if (!components.length) {
          components.add(template);
        }
      }
    }
  });
};
