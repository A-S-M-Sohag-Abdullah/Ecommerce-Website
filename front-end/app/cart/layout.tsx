import ProtectedRoute from "@/components/RouteHelpers/ProtectedRoute";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
