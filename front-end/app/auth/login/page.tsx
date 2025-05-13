
import Link from "next/link";

export default function Login() {

  return (
    <form action="" className="flex flex-col w-md">
      <h1 className="text-3xl mb-2 font-medium">Log in to Exclusive</h1>
      <p className="text-md mb-7 font-medium">Enter your details below</p>

      <input
        type="text"
        placeholder="Email or Phone Number"
        className="p-2 border-b mb-9 focus:outline-0"
      />

      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        className="p-2 border-b mb-9 focus:outline-0"
      />

      <button className="p-4 w-full bg-red-400 text-white text-xl rounded-sm mb-3 cursor-pointer">
        Login
      </button>
      <a href="#" className="text-center text-red-400  mb-5">
        Forgot Password?
      </a>
      <button className="border border-gray-500 p-4 flex justify-center rounded-sm cursor-pointer">
        {" "}
        <img src="/google.png" alt="" className="me-1" /> Sign in With Google
      </button>

      <p className="flex justify-center mt-6">
        Register with your information?
        <Link href="/auth/signup" className="border-b ms-1">
          Signup
        </Link>
      </p>
    </form>
  );
}
