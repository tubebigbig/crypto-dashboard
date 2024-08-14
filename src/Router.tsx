import Dashboard from "./pages/Dashboard";
import WalletAssets from "./pages/WalletAssets";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "account/wallet-assets",
    element: <WalletAssets />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
