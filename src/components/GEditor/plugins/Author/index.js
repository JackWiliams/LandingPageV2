import loadComponents from "./components";
import loadBlocks from "./blocks";

export default editor => {
  loadComponents(editor);
  loadBlocks(editor);
};
