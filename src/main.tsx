import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PaymentPage } from "./pages/Payment";
import { SuccessPage } from "./pages/Success";
import { FailPage } from "./pages/Fail";

const router = createBrowserRouter([
  {
    path: "/tosspayment-with-vite",
    element: <PaymentPage />,
  },
  {
    path: "success",
    element: <SuccessPage />,
  },
  {
    path: "fail",
    element: <FailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
