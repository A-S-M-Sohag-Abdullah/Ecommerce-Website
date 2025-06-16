import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black">
      <section id="footer" className="mx-auto container p-5 py-20">
        <div className="flex text-white xl:space-x-10 space-x-5">
          <div className="w-1/5">
            <h2 className="text-2xl font-medium">Exclusive</h2>
            <h3 className="text-lg font-bold mt-3">Subscribe</h3>
            <p className="font-thin text-[12px]">
              Get 10% off your first order
            </p>
            <form className="flex w-full flex-wrap mt-3 max-w-full rounded-sm border border-white">
              <input
                type="email"
                className="outline-0 block h-10 flex-auto max-w-[70%] px-2 text-sm placeholder:text-gray-400"
                placeholder="Enter Email Here"
              />
              <button className="block bg-white text-black h-10 flex-auto font-medium">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className="w-1/5">
            <h3 className="text-xl">Support</h3>
            <ul className="text-[12px] space-y-3 mt-3 [&>li:hover]:font-semibold">
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>

          <div className="w-1/5">
            <h3 className="text-xl">Account</h3>
            <ul className="text-[12px] space-y-3 mt-3  [&>li:hover]:font-semibold">
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <h3 className="text-xl">Quick Link</h3>
            <ul className="text-[12px] space-y-3 mt-3  [&>li:hover]:font-semibold">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <h3 className="text-xl">Download App</h3>
            <p className="text-[10px] mt-3">Save $3 with App New User Only</p>
            <div className="flex space-x-2 py-2">
              <div className="app-qr">
                <img src="/qr.svg" alt="" className="block" />
              </div>
              <div className="app-links space-y-3">
                <a href="" className="block">
                  <img src="/playstore.svg" alt="" className="block" />
                </a>
                <a href="" className="block">
                  <img src="/appstore.svg" alt="" className="block" />
                </a>
              </div>
            </div>
            <ul className="flex space-x-5 items-center mt-3">
              <li>
                <a href="" className="block">
                  <Image
                    src="/fb.svg"
                    alt="Fb logo"
                    width={10}
                    height={10}
                    priority
                  />
                </a>
              </li>
              <li>
                <a href="" className="block">
                  <Image
                    src="/in.svg"
                    alt="Next.js logo"
                    width={15}
                    height={15}
                    priority
                  />
                </a>
              </li>
              <li>
                <a href="" className="block">
                  <Image
                    src="/ln.svg"
                    alt="Next.js logo"
                    width={15}
                    height={15}
                    priority
                  />
                </a>
              </li>
              <li>
                <a href="" className="block">
                  <Image
                    src="/tw.svg"
                    alt="Next.js logo"
                    width={15}
                    height={15}
                    priority
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
