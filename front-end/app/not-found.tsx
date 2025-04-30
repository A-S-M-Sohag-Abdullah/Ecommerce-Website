import Link from "next/link";

export default function Custom404() {
  return (
    <div className="bg-white  w-full max-w-5xl mx-auto flex rounded-lg justify-between flex-wrap pb-20 my-8">
      <div className="flex justify-between items-center px-6 py-4  w-full">
        <p className="text-gray-500 text-sm">
          Home / <span className="text-gray-700 font-medium">404 Error</span>
        </p>
      </div>

      <div className="w-full">
        <h1 className="text-8xl text-center py-5">404 Not Found</h1>
        <p className="text-center font-medium">
          Your visited page not found. You may go home page.
        </p>

        <Link href="/" className="w-72 h-10 bg-red-400 text-white mx-auto max-w-10/12 flex items-center justify-center rounded-sm mt-5">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
