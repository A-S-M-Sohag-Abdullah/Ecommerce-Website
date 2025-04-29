import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex items-center my-10">
      <div className="w-1/2">
        <Image
          src="/entry.png"
          alt="Entry Image"
          width={1000}
          height={100}
          className="object-contain"
        />
        {/* <img src="/entry.png" alt="" className="w-full" /> */}
      </div>
      <div className="w-1/2 flex justify-center">{children}</div>
    </section>
  );
}
