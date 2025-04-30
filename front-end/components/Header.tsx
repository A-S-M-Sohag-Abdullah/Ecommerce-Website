import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center border-b bg-white">
      <div className="container flex justify-between items-center px-4 py-6">
        <div className="text-3xl font-semibold text-red-400">
          <Link href="/">Exclusive</Link>
        </div>
        <nav>
          <ul className="flex [&>li:hover]:text-red-500 [&>li]:font-semibold [&>li]:text-black ">
            <li className="px-3 font-medium">
            <Link href="/">Home</Link>
            </li>
            <li className="px-3 font-medium">
            <Link href="/contact">Contact</Link>
            </li>
            <li className="px-3 font-medium">
              <a href="#">About</a>
            </li>
            <li className="px-3 font-medium">
            <Link href="/auth/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <div
          id="search-box"
          className="flex  bg-gray-100 rounded-sm  px-3 py-2"
        >
          <input
            type="text"
            placeholder="Search Products Here"
            className="focus:outline-0 text-sm w-full text-black"
          />
        </div>
      </div>
    </header>
  );
}
