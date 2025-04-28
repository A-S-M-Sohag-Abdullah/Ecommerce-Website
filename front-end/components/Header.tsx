export default function Header() {
  return (
    <header className="flex justify-center border-b bg-white">
      <div className="container flex justify-between items-center px-4 py-6">
        <div className="text-3xl font-semibold text-red-400">Exclusive</div>
        <nav>
          <ul className="flex [&>li:hover]:text-red-500 [&>li]:font-semibold">
            <li className="px-3 font-medium">
              <a href="#">Home</a>
            </li>
            <li className="px-3 font-medium">
              <a href="#">Contact</a>
            </li>
            <li className="px-3 font-medium">
              <a href="#">About</a>
            </li>
            <li className="px-3 font-medium">
              <a href="#">Sign Up</a>
            </li>
          </ul>
        </nav>
        <div id="search-box" className="flex  bg-gray-100 rounded-sm  px-3 py-2">
          <input
            type="text"
            placeholder="Search Products Here"
            className="focus:outline-0 text-sm w-full"
          />
        </div>
      </div>
    </header>
  );
}
