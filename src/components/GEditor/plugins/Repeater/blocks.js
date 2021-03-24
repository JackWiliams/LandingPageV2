import { REPEATER, LISTICLE } from "./constants";
import style from "./components/style";

export default editor => {
  const blockManager = editor.BlockManager;

  blockManager.add(REPEATER, {
    category: "Basic",
    label: "Repeater",
    content: `<div data-gjs-type="${REPEATER}"/><style>${style}</style>`
  });

  blockManager.add("test", {
    category: "Basic",
    label: "Test",
    content: `<div data-gjs-type="${LISTICLE}"/>`
  });
};
