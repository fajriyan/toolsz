import Link from "next/link";

const donationLinks = [
  {
    name: "Buy Me a Coffee",
    href: "https://www.buymeacoffee.com/fajriyan",
    description: "Dukung lewat donasi cepat dan simpel dari luar negeri.",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    logo: "https://play-lh.googleusercontent.com/aMb_Qiolzkq8OxtQZ3Af2j8Zsp-ZZcNetR9O4xSjxH94gMA5c5gpRVbpg-3f_0L7vlo",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M7 9.5h9.2a2.3 2.3 0 0 1 0 4.6H9.2a2.2 2.2 0 0 1-2.2-2.2V9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7h7.5a3.5 3.5 0 0 1 0 7H9.3A3.3 3.3 0 0 1 6 10.7V7.9A.9.9 0 0 1 6.9 7H8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 15.5c0 1.9-1.5 3.5-3.5 3.5H9.7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Saweria",
    href: "https://saweria.co/fajriyan",
    description: "Pilihan lokal yang cocok untuk dukung via rupiah.",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    logo: "https://substackcdn.com/image/fetch/$s_!uSY4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F01c81f8c-18c9-47d7-b7ad-c04058016626_225x225.png",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M5 13.5 12 4l7 9.5-7 6.5-7-6.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.2h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function DonationSection() {
  return (
    <section className="container mx-auto my-[150px] px-5 md:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 to-cyan-950 px-6 py-10 shadow-2xl sm:px-8 md:px-10 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.18),transparent_30%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4 text-white">
            <h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
              Dukung Toolsz supaya terus hidup, berkembang, dan tetap gratis.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Setiap donasi membantu biaya server, maintenance, dan pengembangan
              tools baru. Kalau Toolsz pernah membantu pekerjaanmu, kamu bisa
              balas dukungan lewat salah satu platform di bawah ini.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="https://saweria.co/fajriyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Dukung via Saweria
              </Link>
              <Link
                href="https://www.buymeacoffee.com/fajriyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Buy Me a Coffee
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {donationLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <img src={item.logo} alt="Logo Donasi" width="auto" height="auto" className="rounded-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400 transition group-hover:text-white">
                        Open
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
