import Changelog from "@/components/Changelog";
import GalleryFadeSlide from "@/components/GalleryFadeSlide";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="container mx-auto flex items-center px-5 md:px-0 h-[90dvh] gap-0 sm:gap-14">
        <div className="w-full md:w-[60%]  flex flex-wrap flex-col gap-5 justify-center">
          {/* Start Bar Update */}
          <Link
            href={"/changelog"}
            className="py-1 border hover:border-slate-700 group rounded-full  w-[300px] md:w-max flex items-center"
          >
            <span className="px-5 text-[16px] line-clamp-1">
              <Changelog />
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
              <Link
                href={"/layanan"}
                className="text-cyan-200 border px-5 rounded-md duration-500 transition-colors border-cyan-700 bg-gradient-to-r hover:to-cyan-900 from-gray-700 via-gray-900 to-black"
              >
                Tools Online
              </Link>{" "}
              Praktis, Ringan, dan Gratis di{" "}
              <span className="text-sky-800">Toolsz</span>
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
                className="relative inline-block p-px font-semibold leading-6 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black cursor-pointer rounded-xl shadow-emerald-900/30 transition-all duration-300 ease-in-out hover:shadow-cyan-600 py-2.5 px-6 hover:ring-4 ring-cyan-600"
              >
                Mulai Explorasi
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
          <GalleryFadeSlide
            images={[
              "https://images.unsplash.com/photo-1651611243377-2c15b94ad613?q=80&w=2500&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1740568439425-8ef0deafe965?q=80&w=2532&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1679173480513-8e2d4f583b86?q=80&w=1035&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1676799910063-a349396b70e7?q=80&w=1035&auto=format&fit=crop",
            ]}
          />
        </div>
        {/* End Hero Image Assets  */}
      </section>

      <section className="container mx-auto my-[150px] px-5 md:px-0 ">
        <div className="py-5">
          <h2 className="text-2xl md:text-center font-semibold">
            Layanan yang Paling Banyak Digunakan
          </h2>
          <p className="md:text-center mt-2 text-sm">
            Beragam layanan populer yang siap menunjang produktivitas Anda.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4 xl:grid-cols-5 md:gap-4 py-4">
            <Link
              href={"/layanan/word-counter"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
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
              <div className="text-xs">
                Hitung Kata Berulang dengan Penyajian Statistik Lengkap
              </div>
            </Link>
            <Link
              href={"/layanan/meta-generator"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"></path>
              </svg>
              <h3 className="font-semibold text-center">Meta Generator</h3>
              <div className="text-xs">
                Buat Meta tag meta dan detail penting tentang halaman web milik
                anda.
              </div>
            </Link>
            <Link
              href={"/layanan/cron-generator"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"
                />
              </svg>
              <h3 className="font-semibold text-center">Cron Generator</h3>
              <div className="text-xs">
                Buat dan preview cron expression untuk scheduler Anda.
              </div>
            </Link>
            <Link
              href={"/layanan/youtube-embed-generator"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              <h3 className="font-semibold text-center">Youtube Embed Code</h3>
              <div className="text-xs">
                Sematkan video youtube pada situs dengan pilihan banyak option
                mudah
              </div>
            </Link>
            <Link
              href={"/layanan/bcrypt-hash-generator"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                />
              </svg>
              <h3 className="font-semibold text-center">
                Bcrypt Hash Generator
              </h3>
              <div className="text-xs">
                Hasilkan hash bcrypt dengan mudah dan verifikasi keasliannya.
              </div>
            </Link>
            <Link
              href={"/layanan/json-formatter"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15v3c0 .5523.44772 1 1 1h4v-4m-5 0v-4m0 4h5m-5-4V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v1.98935M3 11h5v4m9.4708 4.1718-.8696-1.4388-2.8164-.235-2.573-4.2573 1.4873-2.8362 1.4441 2.3893c.3865.6396 1.2183.8447 1.8579.4582.6396-.3866.8447-1.2184.4582-1.858l-1.444-2.38925h3.1353l2.6101 4.27715-1.0713 2.5847.8695 1.4388"
                />
              </svg>
              <h3 className="font-semibold text-center">JSON Formatter</h3>
              <div className="text-xs">
                Beautify, minify, dan kelola JSON dengan cepat dan rapi.
              </div>
            </Link>
            <Link
              href={"/layanan/text-compare"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6 10 1.99994 1.9999-1.99994 2M11 5v14m-7 0h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"
                />
              </svg>
              <h3 className="font-semibold text-center">Text Compare </h3>
              <div className="text-xs">
                Komparasikan Perbedaan 2 text/ kalimat dengan mudah
              </div>
            </Link>
            <Link
              href={"/layanan/image-extractor"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              <h3 className="font-semibold text-center">Image Extractor</h3>
              <div className="text-xs">
                Alat sederhana untuk mengekstrak dan mengunduh gambar dari
                halaman web.
              </div>
            </Link>
            <Link
              href={"/layanan/robots-generator"}
              className="border flex flex-col items-start gap-2 p-4 rounded-md hover:border-slate-800 "
            >
              <svg
                className="w-10 h-10 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
              </svg>
              <h3 className="font-semibold text-center">
                Robots.txt Generator
              </h3>
              <div className="text-xs">
                Hasilkan Robots.txt SEO Friendly dengan UI yang Simple
              </div>
            </Link>
          </div>
        </div>
        <p className="text-xs text-center">
          Terdapat Lebih dari 15+ Tools. Nantikan update dari kami terkait tools
          lainnya, pendekatan pembuatan tools yang digunakan adalah <br />{" "}
          Developer & SEO, namun tidak menutup kemungkinaan untuk menyediakan
          tools di bidang lain.{" "}
          <Link className="underline hover:text-cyan-700" href={"/layanan"}>
            Semua Tools
          </Link>
        </p>
      </section>

      <section className="container mx-auto my-[150px] px-5 md:px-0 ">
        <div className="h-[400px] sm:h-[450px] object-cover overflow-hidden relative rounded-2xl flex flex-col justify-center  bg-cover bg-[url('https://i.giphy.com/fMYhlRdVtRnsk.webp')]">
          <div className="absolute w-full h-full bg-black/70"></div>
          <div className="relative z-[3] p-5 md:p-10">
            <h2 className="text-4xl text-white font-light">
              Butuh tools tapi{" "}
              <span className="font-bold">Belum tersedia?</span>
            </h2>
            <div className="text-white text-lg font-light mt-3 mb-8">
              Jangan khawatir, ajukan ide kalian maka kami akan wujudkan ide
              kalian dengan cara yang luar biasa.
            </div>
            <a
              href="https://github.com/fajriyan/toolsz/issues"
              target="_blank"
              className="py-3 px-6 border flex items-center gap-2 border-white font-medium rounded-xl hover:ring-4 ring-cyan-600 bg-white/90 backdrop-blur-sm text-gray-900 w-max"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
              Submit Ide Kalian!
            </a>
            <p className="absolute hidden md:block lg:-bottom-[10%] right-7 text-xs text-slate-300 mt-1">
              Tenang ini Gratis kok
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
