import ProtectedRoute from "@/components/RouteHelpers/ProtectedRoute";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
