import Image from "next/image";

const TentangKami = () => {
  return (
    <div className="container px-3 md:px-0 mx-auto h-screen py-5">
      <Image
        src="https://images.unsplash.com/photo-1667584582921-6f09a49d4f6d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={0}
        height={0}
        sizes="100%"
        className="w-full h-[280px] rounded-md object-cover"
        alt="Gambar Hero Section Tentang Kami"
      />

      <h1 className="mt-5 text-xl text-slate-700 font-bold">
        Tentang Layanan Toolsz
      </h1>

      <p>
        Toolsz adalah sebuah proyek <i>open source</i> yang bertujuan untuk
        membantu pengguna dengan menyediakan berbagai alat secara <i>online</i>{" "}
        yang ringan dan mudah digunakan. Kami berkomitmen untuk terus
        memperbarui informasi terkait proyek ini serta menambahkan fitur-fitur
        baru yang bermanfaat melalui repository kami di GitHub yang dapat
        diakses di bawah akun{" "}
        <a
          className=" underline hover:decoration-blue-800 "
          href="https://github.com/fajriyan"
        >
          fajriyan
        </a>
        . Kami sangat menghargai dukungan dan kontribusi dari semua pihak untuk
        memajukan proyek ini. Terima kasih atas perhatiannya dan mari kita
        bersama-sama mengembangkan Toolsz untuk kenyamanan dan kegunaan yang
        lebih baik bagi pengguna.
      </p>
      <div className="mt-5">
        <a
          href="https://www.linkedin.com/in/fajriyan/"
          className="px-5 py-2 bg-slate-800 text-slate-100 rounded-md"
        >
          Hubungi Saya
        </a>
      </div>
      {/* <section className="mt-10">
        <h2 className="font-semibold text-lg">List Fitur</h2>
        Word Counter, Lorem Ipsum Generator, Dummy File Download, Simple Logic
        Gate, MD5 GENERATOR, Whois, DNS Lookup, IP Lookup, Web Scraper, Display
        Resolution View
      </section> */}
    </div>
  );
};

export default TentangKami;
