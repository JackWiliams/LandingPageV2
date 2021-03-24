import { COLLECTION_LIST } from "./constants";

export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add(COLLECTION_LIST, {
    category: "Basic",
    label: "Collection List",
    content: { type: COLLECTION_LIST }
  });
};
