import StoreProvider from "./redux";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AdminLayout>{children}</AdminLayout>
    </StoreProvider>
  );
};

export default AdminWrapper;
