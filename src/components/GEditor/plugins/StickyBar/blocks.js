export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add("sticky-bar", {
    category: "Basic",
    label: "Sticky Bar",
    content: { type: "sticky-bar" }
  });
};
