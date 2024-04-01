export const metadata = {
  title: "Changelog | Toolsz",
  description: "Dapatkan informasi mengenai update aplikasi toolsz disini",
  alternates: {
    canonical: `${process.env.SITE_URL}/changelog`,
  },
};

const Changelog = () => {
  return (
    <div className="container mx-auto py-3 px-3 md:px-0">
      <h1 className="">Halaman Changelog : Support Kami</h1>

      <table className="w-full mt-5 mb-10">
        <thead className="border">
          <th className="border w-[10%]">versi</th>
          <th className="border w-[10%]">tanggal</th>
          <th className="border">deskripsi</th>
        </thead>
        <tbody>
          <td className="border px-2">1.0.0 - Release</td>
          <td className="border px-2">28/11/2024</td>
          <td className="border px-2">
            Rilis aplikasi ke publik (index ke google)
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default Changelog;
