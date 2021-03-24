import { CTRWOW_PRODUCT_LIST } from "./constants";

export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add(CTRWOW_PRODUCT_LIST, {
    category: "Basic",
    label: "CTRWOW Product List",
    content: { type: CTRWOW_PRODUCT_LIST }
  });
};
