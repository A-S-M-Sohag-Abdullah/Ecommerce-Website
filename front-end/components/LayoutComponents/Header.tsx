import Link from "next/link";
import UserloggedIn from "../Others/UserloggedIn";
import SearchBar from "./SearchBar";
import Navbar from "../HomePageComponents/Navbar";

export default function Header() {
  return (
    <header className="flex justify-center border-b bg-white">
      <div className="container flex justify-between items-center px-4 py-6">
        <div className="text-3xl font-semibold text-red-400">
          <Link href="/">Exclusive</Link>
        </div>
        <Navbar />
        <div className="flex items-center space-x-4">
          <div
            id="search-box"
            className="flex  bg-gray-100 rounded-sm  px-3 py-2"
          >
            <SearchBar />
          </div>
          <UserloggedIn />
        </div>
      </div>
    </header>
  );
}
