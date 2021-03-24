import utils from "../utils";

const RepeaterSettingModal = params => {
  const target = params.target;
  const cid = target.cid;
  function getContainer() {
    return `<div>
    <div style="margin-bottom: 5px;">Number of items:</div>
    <div>
      <input id="${
        target.cid
      }" type="number" min="1" step="1" name="items" value="${target.get(
      "items"
    )}"/>
    </div>
    </div>`;
  }
  return {
    title: "Repeater Setting",
    content: getContainer(),
    onClose: () => {
      const input = document.getElementById(cid);
      if (!input) return;
      target.updateData({ items: input.value });
    }
  };
};

const FormSettingModal = params => {
  const target = params.target;
  const cid = target.cid;
  const actions = Object.keys(utils.formActions());
  let options = "";
  if (actions.length > 0) {
    actions.forEach(action => {
      options += `<option value="${action}">${action}</option>`;
    });
  }
  function getContainer() {
    return `<div class="form-group">
    <label for="select-${cid}">Select Action</label>
    <select class="form-control" id="select-${cid}">
      ${options}
    </select>
  </div>
  <button type="submit" onclick="console.log('hello')" class="btn btn-primary">Submit</button>
  `;
  }
  return {
    title: "Form Setting",
    content: getContainer(),
    onClose: () => {
      const input = document.getElementById("select-" + cid);
      console.log("input", input.value);
      if (!input) return;
      target.updateData({ formAction: input.value });
    }
  };
};

export { RepeaterSettingModal, FormSettingModal };
