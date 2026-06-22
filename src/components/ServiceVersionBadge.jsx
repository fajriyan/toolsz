"use client";

import { usePathname } from "next/navigation";
import {
  getServiceSlugFromPath,
  getServiceSlugFromHref,
  getServiceVersionRecord,
} from "@/data/serviceVersions";

function VersionContent({ record, variant }) {
  if (variant === "pill") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
        <span className="uppercase tracking-[0.18em] text-slate-500">
          Versi
        </span>
        <span>{record.current}</span>
      </span>
    );
  }

  if (variant === "floating") {
    return (
      <details className="group fixed bottom-4 left-4 z-50 inline-block">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-lg transition hover:border-slate-900">
          <span className="uppercase tracking-[0.18em] text-slate-500">
            Versi
          </span>
          <span>{record.current}</span>
          <span className="text-slate-400 transition group-open:rotate-180">
            ▼
          </span>
        </summary>

        <div className="absolute left-0 bottom-full mb-2 w-[min(92vw,22rem)] rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Riwayat versi
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Versi aktif {record.current}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
              {record.history.length} rilis
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {record.history
              .slice()
              .reverse()
              .map((item) => (
                <div
                  key={item.version}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {item.version}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.releasedAt}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                    {item.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </details>
    );
  }

  return (
    <details className="group relative inline-block">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-900">
        <span className="uppercase tracking-[0.18em] text-slate-500">
          Versi
        </span>
        <span>{record.current}</span>
        <span className="text-slate-400 transition group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-[min(92vw,22rem)] rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Riwayat versi
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Versi aktif {record.current}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
            {record.history.length} rilis
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {record.history
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item.version}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-900">
                    {item.version}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.releasedAt}
                  </span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                  {item.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </details>
  );
}

export default function ServiceVersionBadge({
  slug,
  href,
  record: recordOverride,
  variant = "details",
  className = "",
}) {
  const pathname = usePathname();
  const activeSlug =
    slug || getServiceSlugFromPath(pathname) || getServiceSlugFromHref(href);
  const record = recordOverride || getServiceVersionRecord(activeSlug);

  if (!record) return null;

  return (
    <div className={className}>
      <VersionContent record={record} variant={variant} />
    </div>
  );
}
