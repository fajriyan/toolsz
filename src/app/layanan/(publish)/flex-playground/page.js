"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [justifyContent, setJustifyContent] = useState("justify-start");
  const [alignItems, setAlignItems] = useState("items-start");
  const [flexDirection, setFlexDirection] = useState("flex-row");
  const [flexWrap, setFlexWrap] = useState("flex-no-wrap");
  const [alignContent, setAlignContent] = useState("content-start");
  const [gap, setGap] = useState("gap-2");

  const [cssCode, setCssCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  useEffect(() => {
    // Konversi kelas Tailwind menjadi CSS
    const cssMap = {
      "justify-start": "justify-content: flex-start;",
      "justify-center": "justify-content: center;",
      "justify-end": "justify-content: flex-end;",
      "justify-between": "justify-content: space-between;",
      "justify-around": "justify-content: space-around;",
      "justify-evenly": "justify-content: space-evenly;",

      "items-start": "align-items: flex-start;",
      "items-center": "align-items: center;",
      "items-end": "align-items: flex-end;",
      "items-stretch": "align-items: stretch;",
      "items-baseline": "align-items: baseline;",

      "flex-row": "flex-direction: row;",
      "flex-row-reverse": "flex-direction: row-reverse;",
      "flex-col": "flex-direction: column;",
      "flex-col-reverse": "flex-direction: column-reverse;",

      "flex-no-wrap": "flex-wrap: nowrap;",
      "flex-wrap": "flex-wrap: wrap;",
      "flex-wrap-reverse": "flex-wrap: wrap-reverse;",

      "content-start": "align-content: flex-start;",
      "content-center": "align-content: center;",
      "content-end": "align-content: flex-end;",
      "content-between": "align-content: space-between;",
      "content-around": "align-content: space-around;",
      "content-evenly": "align-content: space-evenly;",

      "gap-0": "gap: 0px;",
      "gap-1": "gap: 4px;",
      "gap-2": "gap: 8px;",
      "gap-4": "gap: 16px;",
      "gap-8": "gap: 32px;",
      "gap-12": "gap: 48px;",
      "gap-16": "gap: 64px;",
    };

    // Generate the CSS code string
    const generatedCss = `.container {
  display: flex;
  ${cssMap[flexDirection]}
  ${cssMap[flexWrap]}
  ${cssMap[justifyContent]}
  ${cssMap[alignItems]}
  ${cssMap[alignContent]}
  ${cssMap[gap]}
}`;
    setCssCode(generatedCss);

    // Generate the HTML code string for flex items
    const generatedHtml = `<div className="container">
  <div className="box">1</div>
  <div className="box">2</div>
  <div className="box">3</div>
  <div className="box">4</div>
</div>`;
    setHtmlCode(generatedHtml);
  }, [justifyContent, alignItems, flexDirection, flexWrap, alignContent, gap]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert("CSS Copied!");
  };

  return (
    <div className="container mx-auto pb-14">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Flexbox Playground | Flexbox Guide
        </h1>
        <p className="text-center text-xs">
          Pelajari Flexbox CSS dengan visual yang mudah dipahami
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-4 mt-5">
        {/* Control Panel */}
        <div className="flex flex-col gap-4 p-4 border rounded-md w-full md:w-1/4">
          <h2 className="text-xl font-bold">Control Panel</h2>

          {/* Flex Direction */}
          <label>
            <span>Flex Direction:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value)}
            >
              <option value="flex-row">Row</option>
              <option value="flex-row-reverse">Row Reverse</option>
              <option value="flex-col">Column</option>
              <option value="flex-col-reverse">Column Reverse</option>
            </select>
          </label>

          {/* Flex Wrap */}
          <label>
            <span>Flex Wrap:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value)}
            >
              <option value="flex-no-wrap">No Wrap</option>
              <option value="flex-wrap">Wrap</option>
              <option value="flex-wrap-reverse">Wrap Reverse</option>
            </select>
          </label>

          {/* Justify Content */}
          <label>
            <span>Justify Content:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value)}
            >
              <option value="justify-start">Start</option>
              <option value="justify-center">Center</option>
              <option value="justify-end">End</option>
              <option value="justify-between">Space Between</option>
              <option value="justify-around">Space Around</option>
              <option value="justify-evenly">Space Evenly</option>
            </select>
          </label>

          {/* Align Items */}
          <label>
            <span>Align Items:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value)}
            >
              <option value="items-start">Start</option>
              <option value="items-center">Center</option>
              <option value="items-end">End</option>
              <option value="items-stretch">Stretch</option>
              <option value="items-baseline">Baseline</option>
            </select>
          </label>

          {/* Align Content */}
          <label>
            <span>Align Content:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={alignContent}
              onChange={(e) => setAlignContent(e.target.value)}
            >
              <option value="content-start">Start</option>
              <option value="content-center">Center</option>
              <option value="content-end">End</option>
              <option value="content-between">Space Between</option>
              <option value="content-around">Space Around</option>
              <option value="content-evenly">Space Evenly</option>
            </select>
          </label>

          {/* Gap */}
          <label>
            <span>Gap:</span>
            <select
              className="w-full p-2 mt-1 border rounded-md"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
            >
              <option value="gap-0">0</option>
              <option value="gap-1">4px</option>
              <option value="gap-2">8px</option>
              <option value="gap-4">16px</option>
              <option value="gap-8">32px</option>
              <option value="gap-12">48px</option>
              <option value="gap-16">64px</option>
            </select>
          </label>
        </div>

        {/* Flexbox Container */}
        <div className="flex-1 border p-4 rounded-md">
          <div
            className={`flex w-full h-[530px] bg-white p-4 rounded-md border ${flexDirection} ${flexWrap} ${justifyContent} ${alignItems} ${alignContent} ${gap}`}
          >
            <div className="w-24 h-24 bg-slate-800 text-white flex justify-center items-center rounded-md">
              1
            </div>
            <div className="w-24 h-24 bg-slate-800 text-white flex justify-center items-center rounded-md">
              2
            </div>
            <div className="w-24 h-24 bg-slate-800 text-white flex justify-center items-center rounded-md">
              3
            </div>
            <div className="w-24 h-24 bg-slate-800 text-white flex justify-center items-center rounded-md">
              4
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          {/* Textarea untuk CSS */}
          <textarea
            className="w-full h-60 border p-4 rounded-md font-mono text-sm"
            value={cssCode}
            readOnly
          />

          {/* Textarea untuk HTML */}
          <textarea
            className="w-full h-60 border p-4 rounded-md font-mono text-sm"
            value={htmlCode}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
