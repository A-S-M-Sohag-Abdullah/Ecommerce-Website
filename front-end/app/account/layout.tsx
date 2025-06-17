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

        <div className="w-1/4 bg-gray-50 p-6">
          <h2 className="text-gray-700 font-bold mb-4">Manage My Account</h2>
          <ul className="space-y-2 ms-5">
            <li className="text-red-400 font-semibold">My Profile</li>
            <li className="text-gray-600 hover:text-red-400 cursor-pointer">
              Address Book
            </li>
            <li className="text-gray-600 hover:text-red-400 cursor-pointer">
              My Payment Options
            </li>
          </ul>

          <h2 className="text-gray-700 font-bold mt-6 mb-4">My Orders</h2>
          <ul className="space-y-2 ms-5">
            <li className="text-gray-600 hover:text-red-400 cursor-pointer">
              My Orders
            </li>
            <li className="text-gray-600 hover:text-red-400 cursor-pointer">
              My Returns
            </li>
            <li className="text-gray-600 hover:text-red-400 cursor-pointer">
              My Cancellations
            </li>
          </ul>

          <h2 className="text-gray-700 font-bold mt-6 mb-4">My Wishlist</h2>
        </div>

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
