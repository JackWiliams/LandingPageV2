import loadComponents from "./components";
import { SLIDER } from "./constants";
import style from "./style";

export default editor => {
  loadComponents(editor);

  const blockManager = editor.BlockManager;

  blockManager.add(SLIDER, {
    category: "Basic",
    label: "Slider",
    content: `<div data-gjs-type="${SLIDER}"/><style>${style}</style>`
  });
};
