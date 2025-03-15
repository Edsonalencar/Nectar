import { Button, Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HeaderLayout } from "../molecules/HeaderLayout";
import { MenuNavigate } from "../molecules/MenuNavigate";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export const LayoutTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  return (
    <Layout hasSider style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorPrimary }}
      >
        <div className="flex items-center truncate justify-center p-4 mb-3">
          <span className="font-extrabold text-xl text-[#FFF]">
            {!collapsed ? "NECTAR" : "NCTR"}
          </span>
        </div>
        <MenuNavigate />
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <HeaderLayout
          style={{ padding: 0, background: colorBgContainer, zIndex: 20 }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </HeaderLayout>
        <section
          className="flex-1 p-4 overflow-y-auto"
          style={{ height: "100vh", marginTop: "-60px", paddingTop: "80px" }}
        >
          <Outlet />
        </section>
      </Layout>
    </Layout>
  );
};
