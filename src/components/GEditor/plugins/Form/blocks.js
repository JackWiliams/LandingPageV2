import { CTRWOW_FORM } from "./constants";
export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add(CTRWOW_FORM, {
    category: "Basic",
    label: "CTRWOW Form",
    content: { type: CTRWOW_FORM }
  });
};
