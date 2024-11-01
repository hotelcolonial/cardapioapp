import AdminProps from "@/components/admin/AdminProps";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminProps>{children}</AdminProps>;
}
