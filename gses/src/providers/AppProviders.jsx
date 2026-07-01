import { AdminAuthProvider } from "../admin/context/AdminAuthContext";
import { ProductProvider } from "../user/context/ProductContext";
import { UserAuthProvider } from "../user/context/UserAuthContext";

export const AppProviders = ({ children }) => {
  return (
    <UserAuthProvider>
      <AdminAuthProvider>
        <ProductProvider>{children}</ProductProvider>
      </AdminAuthProvider>
    </UserAuthProvider>
  );
};
