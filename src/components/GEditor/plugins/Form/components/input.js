import { CTRWOW_FORM } from "../constants";
import template from "./template";
import style from "./style";

export default editor => {
  const domComponent = editor.DomComponents;
  const cssc = editor.CssComposer;

  const createCssStyles = () => {
    cssc.getAll().add(style);
  };

  domComponent.addType(CTRWOW_FORM, {
    model: {
      defaults: {
        name: "Form Group",
        classes: ["ctrwow-form-group"],
        builtInBlock: true,
        customToolbar: [
          {
            id: "tlb-settings",
            command: () => editor.runCommand("cmd-open-form-group-settings"),
            label: `<i class="fa fa-gear"/>`
          }
        ]
      }
    },
    view: {
      init() {
        const { model } = this;
        const components = model.components();
        !cssc.getClassRule(`ctrwow-form-group`) && createCssStyles();
        if (!components.length) {
          components.add(template);
        }
      }
    }
  });
};
