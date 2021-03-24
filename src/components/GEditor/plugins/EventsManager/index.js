import { cmdEvents } from "./constants";
import loadCommands from "./commands";

export default editor => {
  loadCommands(editor);
  const panels = editor.Panels;
  const panelViews = panels.getPanel("views");
  panelViews.get("buttons").add([
    {
      id: cmdEvents,
      command: cmdEvents,
      className: "fa fa-flash"
    }
  ]);
};
