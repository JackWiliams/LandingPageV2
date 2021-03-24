import React from "react";
import { Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { userSignOut } from "../../appRedux/actions/Auth";

const UserInfo = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log("log out");
    dispatch(userSignOut());
  };

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li onClick={() => onLogout()}>Log out</li>
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
