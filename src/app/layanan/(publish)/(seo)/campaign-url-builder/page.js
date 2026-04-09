"use client";

import { useState } from "react";

export default function CampaignURLBuilder() {
  const [form, setForm] = useState({
    url: "",
    utm_id: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const [generatedUrl, setGeneratedUrl] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updated);
    const newErrors = {};
    let errorMessage = "";
    if (!updated.url) {
      newErrors.url = true;
      errorMessage = "Website URL wajib diisi";
    } else {
      const urls = updated.url
        .split("\n")
        .map((u) => u.trim())
        .filter((u) => u !== "");

      const hasValidUrl = urls.some((u) => validateUrl(u));
      if (!hasValidUrl) {
        newErrors.url = true;
        errorMessage = "Minimal 1 URL valid diperlukan";
      }
    }

    if (!updated.utm_source) {
      newErrors.utm_source = true;
      errorMessage = errorMessage || "Campaign Source wajib diisi";
    }

    if (!updated.utm_medium) {
      newErrors.utm_medium = true;
      errorMessage = errorMessage || "Campaign Medium wajib diisi";
    }

    if (!updated.utm_campaign) {
      newErrors.utm_campaign = true;
      errorMessage = errorMessage || "Campaign Name wajib diisi";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setGeneratedUrl("");
      setError(errorMessage);
      return;
    }

    setError("");

    const urls = updated.url
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u !== "");

    if (urls.length === 0) {
      setGeneratedUrl("");
      return;
    }

    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (key !== "url" && value) {
        params.append(key, value);
      }
    });

    const results = [];
    const invalidUrls = [];

    urls.forEach((url) => {
      if (!validateUrl(url)) {
        invalidUrls.push(url);
        return;
      }

      const separator = url.includes("?") ? "&" : "?";
      const finalUrl = `${url}${
        params.toString() ? separator + params.toString() : ""
      }`;

      results.push(finalUrl);
    });

    if (invalidUrls.length > 0) {
      setError(`Beberapa URL tidak valid (${invalidUrls.length})`);
    } else {
      setError("");
    }
    setGeneratedUrl(results.join("\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
  };

  const getDateTime = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const date =
      now.getFullYear() +
      "-" +
      pad(now.getMonth() + 1) +
      "-" +
      pad(now.getDate());
    const time =
      pad(now.getHours()) +
      "-" +
      pad(now.getMinutes()) +
      "-" +
      pad(now.getSeconds());

    return {
      file: `${date}_${time}`,
      readable: `${date} ${time.replace(/-/g, ":")}`,
    };
  };

  const exportTXT = () => {
    const dt = getDateTime();
    const content = `# Campaign URL Export Toolsz
export_from: Toolsz (https://toolsz.vercel.app)
exported_at: ${dt.readable}

----------------------------------------

${generatedUrl}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campaign-url_${dt.file}.txt`;
    a.click();
  };

  const exportJSON = () => {
    const dt = getDateTime();
    const urls = generatedUrl.split("\n").filter(Boolean);
    const data = {
      export_from: "Toolsz",
      exported_at: dt.readable,
      total: urls.length,
      campaigns: urls.map((url) => ({
        url,
        utm_source: form.utm_source,
        utm_medium: form.utm_medium,
        utm_campaign: form.utm_campaign,
        utm_id: form.utm_id,
        utm_term: form.utm_term,
        utm_content: form.utm_content,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const fileUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `campaign-url_${dt.file}.json`;
    a.click();
  };

  const getInputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-cyan-600"
    }`;

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Campaign URL Builder | SEO Tools
          </h1>
          <p className="text-center text-xs">
            Buat URL campaign dengan parameter UTM secara cepat untuk tracking
            Google Analytics dan marketing campaign.
          </p>
        </div>

        <div className="md:w-[80%] xl:w-[50%] mx-auto mt-7">
          <div className="border border-slate-500 rounded-lg p-3 pt-4 relative">
            <span className="absolute text-sm bg-white -top-3 left-3 px-2">
              Pengaturan
            </span>
            <div className="grid grid-cols-1 gap-2">
              <div className="">
                <label htmlFor="url" className="text-xs">
                  URL Website <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="url"
                  placeholder={`https://toolsz.vercel.app/url-1\nhttps://toolsz.vercel.app/url-2`}
                  onChange={handleChange}
                  className={getInputClass("url") + " resize-none"}
                  rows={4}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign Source <span className="text-red-600">*</span>
                </label>
                <input
                  name="utm_source"
                  placeholder="Campaign Source"
                  onChange={handleChange}
                  className={getInputClass("utm_source")}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign Medium <span className="text-red-600">*</span>
                </label>
                <input
                  name="utm_medium"
                  placeholder="Campaign Medium"
                  onChange={handleChange}
                  className={getInputClass("utm_medium")}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="utm_campaign"
                  placeholder="Campaign Name"
                  onChange={handleChange}
                  className={getInputClass("utm_campaign")}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign ID
                </label>
                <input
                  name="utm_id"
                  placeholder="Campaign ID"
                  onChange={handleChange}
                  className={getInputClass("utm_id")}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign Term
                </label>
                <input
                  name="utm_term"
                  placeholder="Campaign Term"
                  onChange={handleChange}
                  className={getInputClass("utm_term")}
                />
              </div>

              <div className="">
                <label htmlFor="url" className="text-xs">
                  Campaign Content
                </label>
                <input
                  name="utm_content"
                  placeholder="Campaign Content"
                  onChange={handleChange}
                  className={getInputClass("utm_content")}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          {generatedUrl && (
            <div className="space-y-3">
              <div className="border border-slate-500 rounded-lg p-3 pt-4 relative">
                <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                  Output URL ({generatedUrl.split("\n").length})
                </span>

                <textarea
                  value={generatedUrl}
                  readOnly
                  rows={10}
                  className="w-full p-2 text-sm border-none focus-within:outline-none"
                />

                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="bg-gradient-to-r hover:ring-2 ring-cyan-600 from-gray-800 to-slate-900 font-medium text-sm text-white px-4 py-[7px] min-w-max rounded-lg"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={exportTXT}
                    className="border border-gray-800 hover:ring-2 ring-cyan-600  font-medium text-sm text-gray-700 px-2 py-[2px] min-w-max rounded-lg gap-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="26px"
                      viewBox="0 0 32 32"
                    >
                      <title xmlns="">txt</title>
                      <path
                        fill="currentColor"
                        d="M21 11h3v12h2V11h3V9h-8zm-1-2h-2l-2 6l-2-6h-2l2.75 7L12 23h2l2-6l2 6h2l-2.75-7zM3 11h3v12h2V11h3V9H3z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={exportJSON}
                    className="border border-gray-800 hover:ring-2 ring-cyan-600  font-medium text-sm text-gray-700 px-2 py-[2px] min-w-max rounded-lg gap-1 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <title xmlns="">json</title>
                      <path
                        fill="currentColor"
                        d="M31 11v10h-2l-2-6v6h-2V11h2l2 6v-6zm-9.666 10h-2.667A1.67 1.67 0 0 1 17 19.334v-6.667A1.67 1.67 0 0 1 18.666 11h2.667A1.67 1.67 0 0 1 23 12.666v6.667A1.67 1.67 0 0 1 21.334 21M19 19h2v-6h-2Zm-5.666 2H9v-2h4v-2h-2a2 2 0 0 1-2-2v-2.334A1.67 1.67 0 0 1 10.666 11H15v2h-4v2h2a2 2 0 0 1 2 2v2.334A1.67 1.67 0 0 1 13.334 21m-8 0H2.667A1.67 1.67 0 0 1 1 19.334V17h2v2h2v-8h2v8.334A1.67 1.67 0 0 1 5.334 21"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
