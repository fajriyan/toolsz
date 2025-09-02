"use client";

// app/page.js
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [metaTags, setMetaTags] = useState({
    charSet: "UTF-8", // Tambahkan state untuk charSet
    siteTitle: "",
    siteDescription: "",
    siteName: "",
    siteUrl: "https://",
    imageUrl: "https://",
    revisitAfter: "1 day",
    contentType: "website",
    author: "",
    robotsIndex: "index",
    robotsFollow: "follow",
    schemaType: "website",
    twitterCardType: "summary",
    twitterDomain: "/",
    primaryLanguage: "Indonesian",
    generators: "Toolsz, Tools Online",
  });

  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetaTags((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    const initialState = {
      charSet: "UTF-8", // Reset value untuk charSet
      siteTitle: "",
      siteDescription: "",
      siteName: "",
      siteUrl: "https://",
      imageUrl: "https://",
      revisitAfter: "1 day",
      contentType: "website",
      author: "",
      robotsIndex: "index",
      robotsFollow: "follow",
      schemaType: "website",
      twitterCardType: "summary",
      twitterDomain: "/",
      primaryLanguage: "Indonesian",
      generators: "Toolsz, Tools Online",
    };
    setMetaTags(initialState);
  };

  const handleCopy = () => {
    if (previewRef.current) {
      navigator.clipboard.writeText(previewRef.current.innerText);
      toast((t) => (
        <div className="flex items-center gap-2">
          Meta Tag Berhasil di Copy
          <button onClick={() => toast.dismiss(t.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0">
      <div className="py-5 mb-10">
        <h1 className="text-xl text-center font-semibold">
          Meta Generator | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Membantu Anda membuat tag meta dan detail penting tentang halaman web
          milik anda.
        </p>
      </div>
      <div className=" flex flex-wrap justify-between text-slate-800">
        {/* Form Section */}
        <div className=" bg-white rounded w-full md:w-[65%]">
          <div className="flex flex-wrap gap-10">
            <form className="w-full md:w-[45%]">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="charSet"
                >
                  Character Set
                </label>
                <select
                  id="charSet"
                  name="charSet"
                  value={metaTags.charSet}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="UTF-8">UTF-8</option>
                  <option value="UTF-16">UTF-16</option>
                  <option value="ISO-8859-1">ISO-8859-1</option>
                  <option value="WINDOWS-1252">WINDOWS-1252</option>
                </select>
              </div>

              {/* Text Input Fields */}
              {[
                { name: "siteTitle", label: "Site Title" },
                { name: "siteDescription", label: "Site Description" },
                { name: "siteName", label: "Site Name (og:image)" },
                { name: "siteUrl", label: "Site URL" },
                { name: "imageUrl", label: "Image URL (og:image)" },
                { name: "author", label: "Author (Optional)" },
                { name: "twitterDomain", label: "Twitter Domain" },
                {
                  name: "generators",
                  label: "Meta Generators (Comma-separated)",
                },
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={field.name}
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={metaTags[field.name]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </form>
            <form className="w-full md:w-[45%]">
              {[
                {
                  name: "revisitAfter",
                  label:
                    "Search engines should revisit this page after (Optional)",
                  options: ["", "1 day", "7 days", "30 days", "90 days"],
                },
                {
                  name: "contentType",
                  label: "What type of content will your site display?",
                  options: [
                    "",
                    "Blog",
                    "E-commerce",
                    "Portfolio",
                    "News",
                    "Social Media",
                  ],
                },
                {
                  name: "robotsIndex",
                  label: "Allow robots to index your website?",
                  options: ["", "index", "noindex"],
                },
                {
                  name: "robotsFollow",
                  label: "Allow robots to follow all links?",
                  options: ["", "follow", "nofollow"],
                },
                {
                  name: "schemaType",
                  label: "Type (schema)",
                  options: [
                    "",
                    "Article",
                    "Product",
                    "Organization",
                    "Person",
                    "Event",
                  ],
                },
                {
                  name: "twitterCardType",
                  label: "Twitter card Type",
                  options: [
                    "",
                    "summary",
                    "summary_large_image",
                    "app",
                    "player",
                  ],
                },
                {
                  name: "primaryLanguage",
                  label: "What is your site primary language?",
                  options: [
                    "",
                    "en",
                    "es",
                    "fr",
                    "de",
                    "zh",
                    "ja",
                    "Indonesian",
                  ],
                },
              ].map((dropdown) => (
                <div key={dropdown.name} className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={dropdown.name}
                  >
                    {dropdown.label}
                  </label>
                  <select
                    id={dropdown.name}
                    name={dropdown.name}
                    value={metaTags[dropdown.name]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    {dropdown.options.map((option) => (
                      <option key={option} value={option}>
                        {option || "Select..."}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="border p-4 rounded h-min sticky top-[80px] w-full md:w-[30%] !z-0 mt-10 md:mt-0">
          <h3 className="text-xl font-semibold mb-2">Preview Meta Tag:</h3>
          <pre
            ref={previewRef}
            className="bg-white p-2 py-0 rounded border text-xs overflow-x-auto"
          >
            {`
<!-- Meta Here -->
<meta charSet="${metaTags.charSet}"/>
<title>${metaTags.siteTitle}</title>
<meta name="description" content="${metaTags.siteDescription}"/>
<meta name="robots" content="${metaTags.robotsIndex},${metaTags.robotsFollow}"/>
<meta name="language" content="${metaTags.primaryLanguage}"/>
<meta name="revisit-after" content="${metaTags.revisitAfter}"/>
<meta name="author" content="${metaTags.author}"/>
<meta name="generator" content="${metaTags.generators}"/>
<link rel="canonical" href="${metaTags.siteUrl}" />

<!-- Opengraph Here -->
<meta property="og:url" content="${metaTags.siteUrl}">
<meta property="og:title" content="${metaTags.siteTitle}"/>
<meta property="og:description" content="${metaTags.siteDescription}"/>
<meta property="og:site_name" content="${metaTags.siteName}">
<meta property="og:type" content="${metaTags.schemaType}">
<meta property="og:image" content="${metaTags.imageUrl}">

<!-- Twitter Opengraph Here -->
<meta name="twitter:card" content="${metaTags.twitterCardType}"/>
<meta property="twitter:domain" content="${metaTags.twitterDomain}"/>
<meta property="twitter:url" content="${metaTags.siteUrl}"/>
<meta name="twitter:title" content="${metaTags.siteTitle}"/>
<meta name="twitter:description" content="${metaTags.siteDescription}"/>
<meta name="twitter:image" content="${metaTags.imageUrl}">
          `}
          </pre>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
