import panels from "./panels";
import commands from "./commands";

export default (editor, config) => {
  commands(editor, config);
  panels(editor, config);
};
