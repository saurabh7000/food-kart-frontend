import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./Page/HomePage";
import AuthCallbackPage from "./Page/AuthCallbackPage";
import UserProfilePage from "./Page/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import MyRestuarantPage from "./Page/MyRestuarantPage";
import SearchPage from "./Page/SearchPage";
import RestaurantDetailPage from "./Page/RestaurantDetailPage";
import CartPage from "./Page/CartPage";
import CheckoutPage from "./Page/CheckoutPage";
import OrderStatusPage from "./Page/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:restaurantId"
        element={
          <Layout>
            <RestaurantDetailPage />
          </Layout>
        }
      />

      <Route path="/auth" element={<AuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path="/my-restaurant"
          element={
            <Layout>
              <MyRestuarantPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <CheckoutPage />
            </Layout>
          }
        />

        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
