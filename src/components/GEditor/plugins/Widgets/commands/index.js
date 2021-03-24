import { cmdWidgets } from "../constants";
import loadWidgetList from "../components/index";

export default (editor, config) => {
  console.log("widgets config", config);
  loadWidgetList(editor);
  const commands = editor.Commands;
  const domComponents = editor.DomComponents;
  commands.add(cmdWidgets, {
    run(editor) {
      const pn = editor.Panels;

      if (!this.widgets) {
        const id = "views-container";
        const widgets = document.createElement("div");
        const panels = pn.getPanel(id) || pn.addPanel({ id });
        const widgetList = domComponents.getWrapper().find("[data-hidden]");
        let children = "";
        if (widgetList.length > 0) {
          widgetList.forEach(w => (children += `<div>${w.getName()}</div>`));
        }
        console.log("children", children);
        widgets.innerHTML = children;
        panels.set("appendContent", widgets).trigger("change:appendContent");
        this.widgets = widgets;
      }

      this.widgets.style.display = "block";
    },

    stop() {
      const widgets = this.widgets;
      widgets && (widgets.style.display = "none");
    }
  });
};
