import React from "react";
import { Avatar, Popover } from "antd";

const UserInfo = () => {
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar
        src="https://ui-avatars.com/api/?rounded=true&background=random"
        className="landing-avatar gx-pointer"
        alt=""
      />
    </Popover>
  );
};

export default UserInfo;
