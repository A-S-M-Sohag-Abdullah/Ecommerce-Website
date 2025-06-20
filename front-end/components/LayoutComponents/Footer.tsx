import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

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
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>
                <a href="#">exclusive@gmail.com</a>
              </li>
              <li>
                <a href="#">+88015-88888-9999</a>
              </li>
            </ul>
          </div>

          <div className="w-1/5">
            <h3 className="text-xl">Account</h3>
            <ul className="text-[12px] space-y-3 mt-3 [&>li:hover]:font-semibold">
              <li>
                <Link href="/account">My Account</Link>
              </li>
              <li>
                <Link href="/login">Login / Register</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/account/my-favourites">Wishlist</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <h3 className="text-xl">Quick Link</h3>
            <ul className="text-[12px] space-y-3 mt-3 [&>li:hover]:font-semibold">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-use">Terms Of Use</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <h3 className="text-xl">Download App</h3>
            <p className="text-[10px] mt-3">Save $3 with App New User Only</p>
            <div className="flex space-x-2 py-2">
              <div className="app-qr">
                <Image
                  width={50}
                  height={50}
                  src="/qr.svg"
                  alt=""
                  className="block"
                />
              </div>
              <div className="app-links space-y-3">
                <a href="" className="block">
                  <Image
                    src="/playstore.svg"
                    alt="Download on Play Store"
                    width={60}
                    height={30}
                    className="block"
                  />
                </a>

                <a href="" className="block">
                  <Image
                    src="/appstore.svg"
                    alt="Download on App Store"
                    width={60}
                    height={30}
                    className="block"
                  />
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
