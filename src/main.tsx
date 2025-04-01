import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./global.css";
import AuthProviderWithNavigate from "./auth/AuthProviderWithNavigate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <AuthProviderWithNavigate>
            <AppRoutes />
          </AuthProviderWithNavigate>
        </QueryClientProvider>
      </Theme>
      <ToastContainer />
    </Router>
  </StrictMode>
);
