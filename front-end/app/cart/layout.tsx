import ProtectedRoute from "@/components/ProtectedRoute";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
