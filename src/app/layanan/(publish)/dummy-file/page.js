const dataDummy = [
  {
    title: "Download PDF",
    size: "7KB",
    url: "/assets/PDFDummy.pdf",
  },
];

const page = () => {
  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Download PDF Dummy | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Unduh file dummy seperti : PDF, DOC, dll
        </p>
      </div>

      <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-4 md:grid-cols-4 gap-8 py-4">
        {dataDummy.map((data) => (
          <div key={data.size + "0002"}>
            {/* Start Card  */}
            <div
              className="border flex flex-col items-center gap-2 p-3 rounded-md"
              key={data.size + 12321}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-filetype-pdf"
                viewBox="0 0 16 16"
              >
                <path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
              </svg>
              <h2 className="font-semibold text-center">{data.title}</h2>
              <div className="flex gap-1">
                <span className="text-xs text-center p-[4px] rounded-md border">
                  Size {data.size}
                </span>
                <span className="text-xs text-center p-[4px] rounded-md border">
                  .pdf
                </span>
              </div>
              <div className="flex gap-1">
                <a
                  href="/assets/PDFDummy.pdf"
                  download={true}
                  className="px-5 md:px-14 py-2 text-center text-white bg-slate-700 rounded-md hover:bg-slate-900"
                >
                  Download
                </a>
                <a
                  href="/assets/PDFDummy.pdf"
                  className="px-2 py-2 text-center text-white bg-slate-700 rounded-md hover:bg-slate-900 flex items-center"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* End Card  */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
