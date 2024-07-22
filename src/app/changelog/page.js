const Changelog = () => {
  return (
    <div className="container mx-auto py-3 px-3 md:px-0">
      <h1 className="">Halaman Changelog : Support Kami</h1>

      <table className="w-full mt-5 mb-10">
        <thead className="border">
        <tr>
          <td className="border w-[10%]">versi</td>
          <td className="border w-[10%]">tanggal</td>
          <td className="border">deskripsi</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className="border px-2">1.0.0 - Release</td>
            <td className="border px-2">28/11/2024</td>
            <td className="border px-2">
              Rilis aplikasi ke publik (index ke google)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Changelog;
