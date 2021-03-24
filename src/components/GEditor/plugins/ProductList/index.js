import loadComponents from "./components";
import { PRODUCT_LIST } from "./constants";
import style from "./style";

export default editor => {
  loadComponents(editor);

  const blockManager = editor.BlockManager;

  blockManager.add(PRODUCT_LIST, {
    category: "Basic",
    label: "Product List",
    content: `<div data-gjs-type="${PRODUCT_LIST}"/><style>${style}</style>`
  });
};
