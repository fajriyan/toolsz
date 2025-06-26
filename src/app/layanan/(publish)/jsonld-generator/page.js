"use client";

import { useState, useEffect } from "react";
import { schemaTemplates } from "./schemas";
import toast from "react-hot-toast";

export default function JsonLdGenerator() {
  const schemaTypes = Object.keys(schemaTemplates);
  const [selectedType, setSelectedType] = useState("Person");
  const [formData, setFormData] = useState({ ...schemaTemplates["Person"] });
  const [jsonLd, setJsonLd] = useState("");

  useEffect(() => {
    setJsonLd(JSON.stringify(formData, null, 2));
  }, [formData]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData({ ...schemaTemplates[type] });
  };

  const handleInputChange = (path, value) => {
    const keys = path.split(".");
    const newData = { ...formData };

    let target = newData;
    while (keys.length > 1) {
      const key = keys.shift();
      target[key] = target[key] || {};
      target = target[key];
    }
    target[keys[0]] = value;

    setFormData(newData);
  };

  const handleArrayChange = (path, value) => {
    handleInputChange(
      path,
      value.split(",").map((v) => v.trim())
    );
  };

  const renderFields = (obj, path = "") =>
    Object.entries(obj).map(([key, value]) => {
      const fullPath = path ? `${path}.${key}` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <div key={fullPath} className="ml-4 border-l pl-2">
            <label className="font-semibold block">{key}</label>
            {renderFields(value, fullPath)}
          </div>
        );
      }

      return (
        <div key={fullPath} className="mb-3">
          <label className="block font-medium">{key}</label>
          <input
            type="text"
            value={Array.isArray(value) ? value.join(", ") : value}
            onChange={(e) =>
              Array.isArray(value)
                ? handleArrayChange(fullPath, e.target.value)
                : handleInputChange(fullPath, e.target.value)
            }
            className="w-full border rounded p-2"
          />
        </div>
      );
    });

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0">
      <div className="py-5 mb-10">
        <h1 className="text-xl text-center font-semibold">
          JSON LD Generator | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Membantu membuat JSON LD untuk melengkapi meta Tag Website kalian.
        </p>
      </div>

      <div className=" flex flex-wrap justify-between text-slate-800">
        {/* Form Section */}
        <div className=" bg-white rounded w-full md:w-[65%]">
          <div className="mb-6">
            <label className="block font-medium mb-2">Schema Type</label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full border p-2 rounded"
            >
              {schemaTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Form */}
          <div className="space-y-4">{renderFields(formData)}</div>
        </div>
        <div className="border p-4 rounded h-min sticky top-[80px] w-full md:w-[30%] !z-0 mt-10 md:mt-0">
          {/* Output Section */}
          <div className="">
            <label className="block font-semibold mb-2 ">Hasil JSON LD </label>
            <pre className=" p-4 rounded overflow-auto text-sm whitespace-pre-wrap border border-slate-200">
              {jsonLd}
            </pre>
            <div className="mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonLd);
                  toast((t) => (
                    <div className="flex items-center gap-2">
                      JSON LD Berhasil di Copy
                      <button onClick={() => toast.dismiss(t.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                      </button>
                    </div>
                  ));
                }}
                className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-copy"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Schema Type Selector */}
    </div>
  );
}
