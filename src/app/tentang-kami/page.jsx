const TentangKami = () => {
  return (
    <div className="container mx-auto h-screen py-5">
      <h1 className="text-xl text-slate-700 font-bold">
        Tentang Layanan Toolz (open source)
      </h1>
      <p className="w-11/12">
        Toolz merupakan project open source buatan saya dengan tujuan membantu
        dengan menciptakan tools online yang bisa digunakan dengan mudah dan
        simple. Update mengenai project ini dan fitur akan diupdate melalui
        Repository di github <a href="https://github.com/fajriyan">fajriyan</a>.
        Terimakasih, mohon dukungannya
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
