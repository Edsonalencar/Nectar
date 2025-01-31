import { Menu, MenuProps } from "antd";
import { menuItems } from "./menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const MenuNavigate: React.FC<MenuProps> = ({ ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useContext(AuthContext);

  const activePath = useMemo(() => {
    const path = location.pathname;
    const pathSplit = path.split("/");
    return `/${pathSplit[1]}`;
  }, [location.pathname]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // Navega para a rota correspondente
  };

  return (
    <Menu
      className="border-none"
      theme="light"
      mode="inline"
      selectedKeys={[activePath]}
      items={user?.role !== "ROLE_ORG" ? menuItems?.filter((item) => item?.key !== "/gestor") : menuItems}
      onClick={handleMenuClick}
      style={{ borderInlineEnd: "none" }}
      {...rest}
    />
  );
};
