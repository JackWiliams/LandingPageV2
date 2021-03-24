import { DROPDOWN } from "./constants";

export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add(DROPDOWN, {
    category: "Basic",
    label: "Dropdown List",
    content: { type: DROPDOWN }
  });
};
