import loadComponents from "./components";
import loadBlocks from "./blocks";
import loadTraits from "./traits";

export default editor => {
  loadTraits(editor);
  loadComponents(editor);
  loadBlocks(editor);
};
