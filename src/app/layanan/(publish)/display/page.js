import dynamic from "next/dynamic";

const Utils = dynamic(() => import("@/app/layanan/(publish)/display/utils"), {
  ssr: false,
  loading: () => <span className="">loading</span>,
});

const Page = () => {
  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Informasi Ukuran Layar | Display Info
        </h1>
        <p className="text-center text-xs">
          Lihat informasi mengenai ukuran layar anda secara online
        </p>
      </div>

      <div className="flex justify-center flex-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          className="w-full"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145" />
        </svg>
        <div className="text-2xl font-semibold w-full text-center">
          <Utils w={true} />
          <span> X </span>
          <Utils h={true} />
        </div>
        <h2 className="text-xs -mt-1">*ukuran layar satuan pixel</h2>
      </div>
    </div>
  );
};

export default Page;
