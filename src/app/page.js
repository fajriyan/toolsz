import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto flex px-3 md:px-0">
      <div className="h-[85vh] flex flex-wrap flex-col gap-5 justify-center">
        {/* Start Bar Update */}
        <div className=" py-1 border rounded-full w-max flex">
          <span className="px-3 ">
            Release 1.0.0 | Launching Site to Public{" "}
          </span>
          <button className="me-[5px] bg-black rounded-full p-1 group hover:bg-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              className="bi bi-arrow-right-circle-fill group-hover:scale-110"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        </div>
        {/* End Bar Update  */}
        <div className="relative z-0">
          <h1 className="font-bold text-5xl leading-[55px]">
            Temukan Alat{" "}
            <span className="underline decoration-yellow-500">
              Produktivitas{" "}
            </span>{" "}
            <br />
            Terbaik dengan Mudah
          </h1>

          <Image
            src="/cursor-blue.png"
            alt="cusror blue"
            className="absolute top-20 lg:top-6 lg:right-16 2xl:right-56"
            width={70}
            height={70}
          />
        </div>
        <p className="md:w-[90%] text-[18px] font-light">
          Beragam Alat dapat Digunakan secara Gratis.{" "}
          <span className="font-semibold">Lorem Generator, Gerbang Logika</span>{" "}
          dan Banyak Lagi Kedepannya. Project Ini Bersifat Open Source.
        </p>
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
