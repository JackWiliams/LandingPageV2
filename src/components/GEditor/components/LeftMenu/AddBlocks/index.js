import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const AddBlocks = (props) => {
  const intl = useIntl();
  const [className, setClassName] = useState("ld-add-blocks");

  useEffect(() => {
    if (props.visible) {
      setClassName("ld-add-blocks active");
    } else setClassName("ld-add-blocks");
  }, [props.visible]);

  return (
    <div className={className}>
      <div className="ld-cbo-blocks">
        <Select style={{ width: 180 }} defaultValue={0}>
          <Select.Option value={0}>Basic Blocks</Select.Option>
          <Select.Option value={1}>Built-in Blocks</Select.Option>
        </Select>
      </div>
      <div id="blocks" className="blocks"></div>
    </div>
  );
};

export default AddBlocks;
