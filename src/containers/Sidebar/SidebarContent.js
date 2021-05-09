import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import SidebarLogo from "./SidebarLogo";

const SidebarContent = () => {
  let { navStyle, themeType } = useSelector(({ settings }) => settings);
  const { pathname } = useSelector(({ common }) => common);

  var roleUser = null;
  const roles = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;

  if (roles && roles[0]) {
    roleUser = roles[0];
  }

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  // const getNavStyleSubMenuClass = (navStyle) => {
  //   if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
  //     return "gx-no-header-submenu-popup";
  //   }
  //   return "";
  // };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
          <AppsNavigation/>
        </div> */}
        <div style={{ height: 10 }}></div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {roleUser === "ROLE_USER" && (
              <Menu.Item key="landing-pages/manager">
                <NavLink
                  to="/landing-pages/manager"
                  activeClassName="landing-active-nav"
                >
                  <i className="icon icon-product-list" />
                  <span>
                    <b>
                      <IntlMessages id="sidebar.landingPage" />
                    </b>
                  </span>
                </NavLink>
              </Menu.Item>
            )}
            {roleUser === "ROLE_USER" && (
              <Menu.Item key="landing-pages/templates">
                <NavLink
                  to="/landing-pages/templates"
                  activeClassName="landing-active-nav"
                >
                  <i className="icon icon-modal" />
                  <span>
                    <b>
                      <IntlMessages id="sidebar.templates" />
                    </b>
                  </span>
                </NavLink>
              </Menu.Item>
            )}
            {roleUser === "ROLE_ADMIN" && (
              <Menu.Item key="user-manager">
                <NavLink
                  to="/user-manager"
                  activeClassName="landing-active-nav"
                >
                  <i className="icon icon-avatar" />
                  <span>
                    <b>
                      <IntlMessages id="sidebar.userManager" />
                    </b>
                  </span>
                </NavLink>
              </Menu.Item>
            )}
            {roleUser === "ROLE_ADMIN" && (
              <Menu.Item key="blocks-manager">
                <NavLink
                  to="/blocks-manager"
                  activeClassName="landing-active-nav"
                >
                  <i className="icon icon-widgets" />
                  <span>
                    <b>
                      <IntlMessages id="sidebar.blockManager" />
                    </b>
                  </span>
                </NavLink>
              </Menu.Item>
            )}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};

export default SidebarContent;
