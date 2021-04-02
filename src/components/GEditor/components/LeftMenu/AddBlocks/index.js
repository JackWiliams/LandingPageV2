import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const AddBlocks = (props) => {
  const intl = useIntl();
  const [className, setClassName] = useState("ld-add-blocks");

  const handleSelect = (value) => {
    if (value != null) {
      let el = document.getElementsByClassName("ld-add-blocks-detail");

      if (el != null && el.length > 0) {
        for (var i = 0; i < el.length; i++) {
          if (el[i].classList.contains("active")) {
            el[i].classList.remove("active");
          }
        }
      }

      if (value === 0) {
        document.getElementById("basic-blocks").classList.add("active");
      } else {
        document.getElementById("builtin-blocks").classList.add("active");
      }
    }
  };

  useEffect(() => {
    if (props.visible) {
      setClassName("ld-add-blocks active");
    } else setClassName("ld-add-blocks");
  }, [props.visible]);

  return (
    <div className={className}>
      <div className="ld-cbo-blocks">
        <Select style={{ width: 180 }} defaultValue={0} onChange={handleSelect}>
          <Select.Option value={0}>Basic Blocks</Select.Option>
          <Select.Option value={1}>Built-in Blocks</Select.Option>
        </Select>
      </div>
      <div
        id="basic-blocks"
        className="ld-add-blocks-detail blocks active"
      ></div>
      <div
        id="builtin-blocks"
        className="ld-add-blocks-detail blocks builtin-blocks"
      ></div>
    </div>
  );
};

export default AddBlocks;
