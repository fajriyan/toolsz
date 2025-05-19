import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="container mx-auto flex items-center px-3 md:px-0 h-[90dvh] gap-0 sm:gap-14">
        <div className="w-full md:w-[60%]  flex flex-wrap flex-col gap-5 justify-center">
          {/* Start Bar Update */}
          <Link
            href={"/changelog"}
            className="py-1 border hover:border-slate-700 group rounded-full  w-[300px] md:w-max flex items-center"
          >
            <span className="px-3 text-[16px] line-clamp-1">
              Version 1.1.0 | Add new tools (Convert Case)
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
                <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </Link>
          {/* End Bar Update  */}
          <div className="">
            <h1 className="font-bold text-3xl sm:text-4xl leading-[40px] md:text-5xl md:leading-[55px]">
              Gunakan{" "}
              <span className="text-cyan-200 border px-3 rounded-md border-cyan-700 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
                Tools Online
              </span>{" "}
              Praktis, Ringan, dan Gratis di Toolsz
            </h1>
          </div>
          <p className="md:w-[90%] text-[15px] sm:text-[16px] md:text-[18px]">
            Toolsz berisi kumpulan tools online gratis yang ringan dan mudah
            digunakan langsung dari browser Kalian. Didesain untuk mendukung
            produktivitas tanpa perlu instalasi atau pendaftaran.
          </p>
          <div className=" flex gap-4 items-center mt-3">
            <div className="relative group">
              <Link
                href="/layanan/"
                className="relative inline-block p-px font-semibold leading-6 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black shadow-xl  hover:shadow-2xl cursor-pointer rounded-full shadow-emerald-900/30 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-cyan-600"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-6 py-2 rounded-full bg-gradient-to-r from-gray-700  to-cyan-950">
                  <div className="relative z-10 flex items-center space-x-3">
                    <span className="transition-all text-[14px] duration-500 group-hover:translate-x-1.5 group-hover:text-cyan-300">
                      Explorasi Sekarang
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-cyan-300"
                    >
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                    </svg>
                  </div>
                </span>
              </Link>
            </div>

            <a
              href="https://github.com/fajriyan/toolsz"
              className="hover:underline flex items-center gap-1"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Start Hero Image Assets  */}
        <div className="relative md:w-[40%]">
          <Image
            src="https://images.unsplash.com/photo-1651611243377-2c15b94ad613?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero Image"
            className="hidden md:block h-[400px] object-cover rounded-2xl"
            width={950}
            height={100}
          />
        </div>
        {/* End Hero Image Assets  */}
      </section>

      <section className="container mx-auto my-10 px-3 md:px-0 ">
        <div className="py-5">
          <h2 className="text-2xl md:text-center font-semibold">
            Layanan yang Paling Banyak Digunakan
          </h2>
          <p className="md:text-center mt-2 text-sm">
            Beragam layanan populer yang siap menunjang produktivitas Anda.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4 py-4">
            {/* Start Card  */}
            <Link
              href={"/layanan/word-counter"}
              className="border flex flex-col items-center gap-2 p-3 rounded-md hover:border-slate-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-filetype-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2" />
                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
              </svg>
              <h3 className="font-semibold text-center">Word Counter</h3>
              <div className="flex gap-1">
                <span className="text-xs text-center p-[4px] rounded-md border">
                  Hitung Kata Berulang
                </span>
              </div>
            </Link>
            {/* End Card  */}
            {/* Start Card  */}
            <Link
              href={"/layanan/lorem-generator"}
              className="border flex flex-col items-center gap-2 p-3 rounded-md hover:border-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-filetype-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563M2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386z" />
              </svg>
              <h3 className="font-semibold text-center">Lorem Generator</h3>
              <div className="flex gap-1">
                <span className="text-xs text-center p-[4px] rounded-md border">
                  Buat Kalimat Lorem Ipsum
                </span>
              </div>
            </Link>
            {/* End Card  */}

            {/* Start Card  */}
            <Link
              href={"/layanan/css-minify"}
              className="border flex flex-col items-center gap-2 p-3 rounded-md hover:border-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-filetype-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.397 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zM6.78 15.29a1.2 1.2 0 0 1-.111-.449h.764a.58.58 0 0 0 .255.384q.106.073.25.114.142.041.319.041.245 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .085-.29.39.39 0 0 0-.153-.326q-.152-.12-.463-.193l-.618-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.351-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.19-.272.527-.422t.777-.149q.456 0 .779.152.326.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.246-.181.9.9 0 0 0-.37-.068q-.324 0-.512.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .404.175l.621.143q.326.075.566.211t.375.358.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375" />
              </svg>
              <h3 className="font-semibold text-center">CSS Minify</h3>
              <div className="flex gap-1">
                <span className="text-xs text-center p-[4px] rounded-md border">
                  Compress Baris Kode CSS
                </span>
              </div>
            </Link>
            {/* End Card  */}
            {/* Start Card  */}
            <Link
              href={"/layanan/convertcase"}
              className="border flex flex-col items-center gap-2 p-3 rounded-md hover:border-slate-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-filetype-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M1.226 10.88H0l2.056-6.26h1.42l2.047 6.26h-1.29l-.48-1.61H1.707l-.48 1.61ZM2.76 5.818h-.054l-.75 2.532H3.51zm3.217 5.062V4.62h2.56c1.09 0 1.808.582 1.808 1.54 0 .762-.444 1.22-1.05 1.372v.055c.736.074 1.365.587 1.365 1.528 0 1.119-.89 1.766-2.133 1.766zM7.18 5.55v1.675h.8c.812 0 1.171-.308 1.171-.853 0-.51-.328-.822-.898-.822zm0 2.537V9.95h.903c.951 0 1.342-.312 1.342-.909 0-.591-.382-.954-1.095-.954zm5.089-.711v.775c0 1.156.49 1.803 1.347 1.803.705 0 1.163-.454 1.212-1.096H16v.12C15.942 10.173 14.95 11 13.607 11c-1.648 0-2.573-1.073-2.573-2.849v-.78c0-1.775.934-2.871 2.573-2.871 1.347 0 2.34.849 2.393 2.087v.115h-1.172c-.05-.665-.516-1.156-1.212-1.156-.849 0-1.347.67-1.347 1.83" />
              </svg>
              <h3 className="font-semibold text-center">Convert Case</h3>
              <div className="flex gap-1">
                <span className="text-xs text-center p-[4px] rounded-md border">
                  Konversi Kepekaan Kapital
                </span>
              </div>
            </Link>
            {/* End Card  */}
          </div>
        </div>
        <p className="text-xs text-center">
          Tools lain dapat ditemukan pada halaman{" "}
          <Link className="underline hover:shadow-md" href={"/layanan"}>
            layanan
          </Link>
        </p>
      </section>
    </main>
  );
}
