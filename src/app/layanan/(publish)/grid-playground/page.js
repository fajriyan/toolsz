"use client";
import { useState } from "react";

const GridPlayground = () => {
  const [columns, setColumns] = useState("grid-cols-3");
  const [gap, setGap] = useState("gap-4");
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  const columnsCSS = {
    "grid-cols-2": "grid-template-columns: repeat(2, 1fr);",
    "grid-cols-3": "grid-template-columns: repeat(3, 1fr);",
    "grid-cols-4": "grid-template-columns: repeat(4, 1fr);",
    "grid-cols-5": "grid-template-columns: repeat(5, 1fr);",
    "grid-cols-6": "grid-template-columns: repeat(6, 1fr);",
    "grid-cols-7": "grid-template-columns: repeat(7, 1fr);",
    "grid-cols-8": "grid-template-columns: repeat(8, 1fr);",
    "grid-cols-9": "grid-template-columns: repeat(9, 1fr);",
  };

  const gapCSS = {
    "gap-2": "gap: 8px;",
    "gap-4": "gap: 16px;",
    "gap-8": "gap: 32px;",
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const removeItem = () => {
    if (items.length > 0) {
      setItems(items.slice(0, -1));
    }
  };

  const cssCode = `.grid {
  display: grid;
  ${columnsCSS[columns]}
  ${gapCSS[gap]}
}

.grid-item {
  background-color: rgb(30,41,59);
  display:flex;
  justify-content: center;
  align-items: center;
}`;

  const htmlCode = `
<div className="grid">
${items.map((item) => `  <div className="grid-item">${item}</div>`).join("\n")}
</div>
`;

  return (
    <div className="container mx-auto min-h-[84vh]">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Grid Playground | Grid Guide
        </h1>
        <p className="text-center text-xs">
          Pelajari Grid CSS dengan visual yang mudah dipahami
        </p>
      </div>

      <div className="flex justify-between gap-4 mt-5">
        <div className="border rounded-md w-full md:w-1/4 flex flex-col gap-4 p-4">
          <div>
            <label className="block mb-2 font-semibold">Kolom:</label>
            <select
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="grid-cols-2">2 Columns</option>
              <option value="grid-cols-3">3 Columns</option>
              <option value="grid-cols-4">4 Columns</option>
              <option value="grid-cols-5">5 Columns</option>
              <option value="grid-cols-6">6 Columns</option>
              <option value="grid-cols-7">7 Columns</option>
              <option value="grid-cols-8">8 Columns</option>
              <option value="grid-cols-9">9 Columns</option>
            </select>
          </div>

          {/* Dropdown untuk memilih gap */}
          <div>
            <label className="block mb-2 font-semibold">Gap:</label>
            <select
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
            >
              <option value="gap-2">8px</option>
              <option value="gap-4">16px</option>
              <option value="gap-8">32px</option>
            </select>
          </div>

          {/* Tombol untuk menambah dan menghapus item */}
          <div className="flex gap-3">
            <button
              onClick={addItem}
              className="bg-slate-900 text-white py-2 px-5 rounded-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle-dotted"
                viewBox="0 0 16 16"
              >
                <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
              Tambah Item
            </button>

            <button
              onClick={removeItem}
              className={`bg-red-800 text-white py-2 px-5 rounded-md flex items-center gap-2 ${
                items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={items.length === 0}
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
              Hapus Item
            </button>
          </div>
        </div>

        <div className="flex-1 border p-4 rounded-md">
          <div className={`grid ${columns} ${gap}`}>
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 text-white h-24 rounded-md flex justify-center items-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <textarea
            className="w-full h-60 border p-4 rounded-md font-mono text-sm"
            value={htmlCode}
            readOnly
          />

          <textarea
            className="w-full h-60 border p-4 rounded-md font-mono text-sm"
            value={cssCode}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default GridPlayground;
