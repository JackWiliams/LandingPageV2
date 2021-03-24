export default (editor) => {
  const blockManager = editor.BlockManager;
  blockManager.add("header-eline", {
    category: "Built-in Blocks",
    label: `<div style="margin-bottom : 10px">
                <img 
                    style="max-width: 100%;
                           max-height: 55px;
                           display: inline-block;
                           vertical-align: middle;"
                    src="../../../../../../../assets/images/blocks/HeaderEline.png" />
                <div class="my-label-block"> Header 1</div>
            </div>`,
    content: { type: "header-eline" },
    attributes: {
      style: "width: 100%",
    },
  });
};
