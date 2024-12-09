import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { theme } from "./theme/themeConfig";
import { routes } from "./routes";
import { LayoutTemplate } from "./components/templates/LayoutTemplate";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginPage } from "./components/pages/Login";

const App: React.FC = () => {
  const renderRoutes = (routes: any[]) => {
    return routes.map(({ path, component: Component, children }, index) => (
      <Route key={index} path={path} element={Component && <Component />}>
        {children && renderRoutes(children)}
      </Route>
    ));
  };

  return (
    <Router>
      <ConfigProvider direction="ltr" theme={theme}>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            {/* Rotas com template */}
            <Route path="/" element={<LayoutTemplate />}>
              {renderRoutes(routes)}
            </Route>

            {/* Rotas sem template */}
            <Route key="login-key" path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
};

export default App;
