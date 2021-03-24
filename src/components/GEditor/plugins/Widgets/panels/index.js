import { cmdWidgets } from "../constants";

export default (editor, config) => {
  console.log("widgets config", config);
  const panels = editor.Panels;
  const panelViews = panels.getPanel("views");
  panelViews.get("buttons").add([
    {
      id: cmdWidgets,
      command: cmdWidgets,
      className: "fa fa-desktop",
      active: 1
    }
  ]);
};
