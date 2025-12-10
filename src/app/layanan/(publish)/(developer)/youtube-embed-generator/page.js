"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [videoId, setVideoId] = useState("PHGV8VUjuts");
  const [controls, setControls] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [mute, setMute] = useState(true);
  const [loop, setLoop] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [autohide, setAutohide] = useState(true);
  const [modestBranding, setModestBranding] = useState(false);
  const [rel, setRel] = useState(false);
  const [disableKB, setDisableKB] = useState(true);
  const [enableJsApi, setEnableJsApi] = useState(true);
  const [ivLoadPolicy, setIvLoadPolicy] = useState(3);

  const applyCleanPreset = () => {
    setControls(false);
    setAutoplay(true);
    setMute(true);
    setLoop(true);
    setShowInfo(false);
    setAutohide(true);
    setModestBranding(false);
    setRel(false);
    setDisableKB(true);
    setEnableJsApi(true);
    setIvLoadPolicy(3);
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=${
    controls ? 1 : 0
  }&autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&loop=${
    loop ? 1 : 0
  }&showinfo=${showInfo ? 1 : 0}&autohide=${autohide ? 1 : 0}&modestbranding=${
    modestBranding ? 1 : 0
  }&rel=${rel ? 1 : 0}&disablekb=${disableKB ? 1 : 0}&enablejsapi=${
    enableJsApi ? 1 : 0
  }&iv_load_policy=${ivLoadPolicy}&playlist=${videoId}`;

  const copyEmbedCode = () => {
    const iframeCode = `<iframe src="${embedUrl}" width="560" height="315" allow="autoplay; encrypted-media" title="YouTube Video" className="border rounded-lg "></iframe>`;
    navigator.clipboard.writeText(iframeCode).then(() => {
      toast((t) => (
        <div className="flex items-center gap-2">
          Code Embed Berhasil di Copy
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
    });
  };

  return (
    <div className="mb-10 px-3 lg:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Youtube Embed Generator | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Sematkan video youtube pada situs dengan pilihan banyak option mudah
        </p>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-wrap lg:flex-row justify-between gap-3">
        <div className="lg:w-[30%] 2xl:w-[28%] p-4 border rounded-md space-y-4">
          <h2 className="text-lg font-bold mb-4">Pengaturan Embed Video</h2>
          <div className="mb-10">
            <label className="block mb-2">
              <span className="font-semibold">Video ID:</span>
              <p className="text-xs">
                https://www.youtube.com/watch?v=
                <b className="text-orange-700">PHGV8VUjuts</b>
              </p>
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Masukkan ID video"
              />
            </label>
            <button
              onClick={applyCleanPreset}
              className="bg-slate-800 hover:bg-slate-950 text-white py-2 px-5 rounded-md flex justify-center  items-center gap-2 w-full relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eraser"
                viewBox="0 0 16 16"
              >
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
              </svg>
              Terapkan Preset Clean
            </button>
          </div>
          <div className="mt-10 relative">
            <h2 className="font-semibold">Setting Manual</h2>
            <div className="flex flex-col gap-2 mt-2">
              <Checkbox
                label="Controls"
                checked={controls}
                onChange={setControls}
              />
              <Checkbox
                label="Autoplay"
                checked={autoplay}
                onChange={setAutoplay}
              />
              <Checkbox label="Mute" checked={mute} onChange={setMute} />
              <Checkbox label="Loop" checked={loop} onChange={setLoop} />
              <Checkbox
                label="Show Info"
                checked={showInfo}
                onChange={setShowInfo}
              />
              <Checkbox
                label="Autohide"
                checked={autohide}
                onChange={setAutohide}
              />
              <Checkbox
                label="Modest Branding"
                checked={modestBranding}
                onChange={setModestBranding}
              />
              <Checkbox
                label="Related Videos (rel)"
                checked={rel}
                onChange={setRel}
              />
              <Checkbox
                label="Disable Keyboard"
                checked={disableKB}
                onChange={setDisableKB}
              />
              <Checkbox
                label="Enable JavaScript API"
                checked={enableJsApi}
                onChange={setEnableJsApi}
              />
              <label className="block mb-2">
                <span className="font-semibold">IV Load Policy:</span>
                <select
                  value={ivLoadPolicy}
                  onChange={(e) => setIvLoadPolicy(Number(e.target.value))}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value={1}>Show Annotations</option>
                  <option value={3}>Hide Annotations</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:w-[68%] 2xl:w-[40%] p-4 border rounded-md overflow-hidden">
          <h2 className="text-lg font-bold mb-4">Preview Video</h2>
          <iframe
            src={embedUrl}
            width="100%"
            height="315"
            allow="autoplay; encrypted-media"
            title="YouTube Video Toolsz"
            className="rounded-md"
          ></iframe>
        </div>

        <div className="lg:w-[100%] 2xl:w-[30%] p-4 border rounded-md space-y-4">
          <h2 className="text-lg font-bold">Embed Code</h2>
          <textarea
            value={`<iframe src="${embedUrl}" width="560" height="315" allow="autoplay; encrypted-media; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
title="YouTube Video Toolsz" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
className="">
</iframe>`}
            readOnly
            rows={19}
            className="w-full p-2 border rounded-md font-mono text-sm"
          ></textarea>
          <button
            onClick={copyEmbedCode}
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
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span>{label}</span>
    </label>
  );
}
