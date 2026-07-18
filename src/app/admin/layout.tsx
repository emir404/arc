import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white">{children}</div>
);

export default AdminLayout;
