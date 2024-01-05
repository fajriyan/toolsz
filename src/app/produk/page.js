import Link from "next/link";

const Produk = () => {
  return (
    <div className="px-3 md:px-0">
      <div className="container mx-auto h-screen">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Daftar Produk Toolz
          </h1>
          <p className="text-center text-xs">
            Silahkan gunakan Layanan ini dengan Gratis
          </p>
        </div>

        <div className="grid grid-rows-2 grid-cols-2 gap-2 md:grid-rows-4 md:grid-cols-4 md:gap-4 py-4">
          {/* Start Card  */}
          <div className="border flex flex-col items-center gap-2 p-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-filetype-pdf"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2"
              />
              <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            </svg>
            <h2 className="font-semibold text-center">Word Counter</h2>
            <div className="flex gap-1">
              <span className="text-xs text-center p-[4px] rounded-md border">
                Hitung Kata Berulang
              </span>
            </div>
            <div className="flex gap-1">
              <Link
                href="/produk/word-counter"
                download={true}
                className="px-5 py-2 text-center text-white bg-slate-700 rounded-md hover:bg-slate-900"
              >
                Buka Produk
              </Link>
            </div>
          </div>
          {/* End Card  */}
          {/* Start Card  */}
          <div className="border flex flex-col items-center gap-2 p-3 rounded-md">
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
            <h2 className="font-semibold text-center">Lorem Generator</h2>
            <div className="flex gap-1">
              <span className="text-xs text-center p-[4px] rounded-md border">
                Buat Kalimat Lorem
              </span>
            </div>
            <div className="flex gap-1">
              <Link
                href="/produk/lorem-generator"
                download={true}
                className="px-5 py-2 text-center text-white bg-slate-700 rounded-md hover:bg-slate-900"
              >
                Buka Produk
              </Link>
            </div>
          </div>
          {/* End Card  */}
          {/* Start Card  */}
          <div className="border flex flex-col items-center gap-2 p-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-filetype-pdf"
              viewBox="0 0 16 16"
            >
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
              <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
            </svg>
            <h2 className="font-semibold text-center">PDF Dummy</h2>
            <div className="flex gap-1">
              <span className="text-xs text-center p-[4px] rounded-md border">
                Download Dummy PDF
              </span>
            </div>
            <div className="flex gap-1">
              <Link
                href="/produk/dummy-file"
                download={true}
                className="px-5 py-2 text-center text-white bg-slate-700 rounded-md hover:bg-slate-900"
              >
                Buka Produk
              </Link>
            </div>
          </div>
          {/* End Card  */}
        </div>
      </div>
    </div>
  );
};

export default Produk;
