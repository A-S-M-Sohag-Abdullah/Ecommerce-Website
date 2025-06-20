import AccountSidebar from "@/components/Others/AccountSidebar";
import ProtectedRoute from "@/components/RouteHelpers/ProtectedRoute";

export default function AcoountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="bg-white  w-full max-w-5xl mx-auto flex rounded-lg justify-between flex-wrap">
        <div className="flex justify-between items-center px-6 py-4  w-full">
          <p className="text-gray-500 text-sm">
            Home / <span className="text-gray-700 font-medium">My Account</span>
          </p>
          <p className="text-gray-700">Welcome!</p>
        </div>

       <AccountSidebar/>

        <div className="w-3/4 p-8">
          <h2 className="text-xl font-bold text-red-400 mb-6">
            Edit Your Profile
          </h2>

          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
