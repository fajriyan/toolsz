import { menuService } from "@/data/menuService";
import Link from "next/link";

const Layanan = () => {
  return (
    <div className="">
      <div className="container mx-auto min-h-[82vh] px-3 md:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Layanan Toolsz Dirancang untuk Kalian
          </h1>
          <p className="text-center text-xs mt-1">Menyediakan berbagai layanan yang mendukung aktivitas dan Produktifitas Kerja. </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4 py-4">
          {menuService.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border flex items-center gap-2 p-3 rounded-md hover:border-slate-800"
            >
              {item.icon}
              <h2 className="font-semibold text-center">{item.text}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layanan;
