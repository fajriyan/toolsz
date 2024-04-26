import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto flex px-3 md:px-0">
      <div className="h-[85vh] flex flex-wrap flex-col gap-5 justify-center">
        {/* Start Bar Update */}
        <Link
          href={"/changelog"}
          className="py-1 border hover:border-slate-700 group rounded-full w-max flex items-center"
        >
          <span className="px-3 text-[16px]">
            Release 1.0.0 | Launching Site to Public
          </span>
          <button className="me-[5px] bg-black rounded-full p-1  hover:bg-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              className="bi bi-arrow-right-circle-fill group-hover:animate-pulse"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        </Link>
        {/* End Bar Update  */}
        <div className="">
          <h1 className="font-bold text-4xl leading-[40px] md:text-5xl md:leading-[55px]">
            Temukan Alat{" "}
            <span className="underline decoration-yellow-500 z-0">
              Produktivitas{" "}
            </span>{" "}
            <br />
            Terbaik dengan Mudah
          </h1>
        </div>
        <p className="md:w-[90%] text-[16px] md:text-[18px]">
          Beragam alat dapat Digunakan secara gratis,{" "}
          <span className="font-semibold">
            {" "}
            seperti : Word Counter, Lorem Generator, CSS Minify - Unminify{" "}
          </span>{" "}
          dan banyak lagi kedepannya. Project ini bersifat{" "}
          <span className="underline">Open Source</span>, Terimakasih.
        </p>
        <div className=" flex gap-4 items-center">
          <Link
            href="/produk/"
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-md w-max"
          >
            Produk Kami
          </Link>
          <a
            href="https://github.com/fajriyan/toolsz"
            className="hover:underline"
          >
            GitHub Stars
          </a>
        </div>
      </div>
      {/* Start Hero Image Assets  */}
      <div className="flex items-center">
        <Image
          src="/heros.webp"
          alt="hero Image"
          className="hidden md:block"
          width={950}
          height={100}
        />
      </div>
      {/* End Hero Image Assets  */}
    </main>
  );
}
