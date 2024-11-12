"use client";

import AuthProvider from "../AuthProvider";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AdminWrapper;
