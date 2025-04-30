"use client";

const Account = () => {
  return (
    <div className="bg-white  w-full max-w-5xl mx-auto flex rounded-lg justify-between flex-wrap">
      <div className="flex justify-between items-center px-6 py-4  w-full">
        <p className="text-gray-500 text-sm">
          Home / <span className="text-gray-700 font-medium">My Account</span>
        </p>
        <p className="text-gray-700">
          Welcome! <span className="text-red-400 font-semibold">Md Rimel</span>
        </p>
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

        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                First Name
              </label>
              <input
                type="text"
                value="Md"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Last Name
              </label>
              <input
                type="text"
                value="Rimel"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value="rimel111@gmail.com"
              className="w-full px-4 py-2 bg-gray-200 rounded-md  cursor-not-allowed"
              disabled
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              value="Kingston, 5236, United State"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
              onChange={() => {}}
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium">
              Password Changes
            </label>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2 focus:outline-none "
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2 focus:outline-none "
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 bg-gray-200 rounded-md mt-2 focus:outline-none "
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-5 py-2 text-gray-600 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-400 cursor-pointer text-white rounded-md hover:bg-red-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
