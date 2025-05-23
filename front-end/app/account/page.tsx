"use client";

const Account = () => {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">First Name</label>
          <input
            type="text"
            value="Md"
            className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none "
            onChange={() => {}}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Last Name</label>
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
  );
};

export default Account;
