export default editor => {
  const blockManager = editor.BlockManager;
  blockManager.add("float-button", {
    category: "Basic",
    label: "Author",
    content: { type: "float-button" }
  });
};
