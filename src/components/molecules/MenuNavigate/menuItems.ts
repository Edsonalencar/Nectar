import { MenuProps } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  SwapOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React from "react";

const nextAuthTokenName =
    import.meta.env.VITE_NEXT_AUTH_TOKEN_NAME ?? "nextauth.token";

export const signOut = () => {
    localStorage.removeItem(nextAuthTokenName);
}


export const menuItems: MenuProps["items"] = [
  {
    key: "/dashboard",
    label: "Home",
    icon: React.createElement(HomeOutlined), // Corrigido com React.createElement
  },
  {
    key: "/gestor",
    label: "Gestores",
    icon: React.createElement(UsergroupAddOutlined),
  },
  {
    key: "/apicultor",
    label: "Apicultores",
    icon: React.createElement(UserSwitchOutlined), // Corrigido com React.createElement
  },
  {
    key: "/servico",
    label: "Serviços",
    icon: React.createElement(SwapOutlined),
  },
  {
    key: "/login",
    label: "Logout",
    icon: React.createElement(LogoutOutlined),
    onClick: signOut,
    style: { position: "absolute", bottom: 0 },
  },
];
