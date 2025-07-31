'use client'

import { useState } from 'react'

export default function RemoveWhitespacePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleRemoveWhitespace = () => {
    const cleaned = input.replace(/\s+/g, '')
    setOutput(cleaned)
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset "copied" after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <div>
      <div className="container mx-auto pb-[80px] sm:py-0 sm:min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5 mb-10">
          <h1 className="text-xl text-center font-semibold">
            Remove Whitespace | SEO Tools
          </h1>
          <p className="text-center text-xs">
            Bersihkan Whitespace pada kalimat, link atau apapun dengan mudah
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="sm:w-[50%]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Silahkan Masukkan kata/ link disini"
              className="border border-slate-700 rounded w-full h-48 py-2 px-3"
            />
            <button
              onClick={handleRemoveWhitespace}
              className="mt-4 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            >
              Hapus Whitespace
            </button>
          </div>
          <div className="sm:w-[50%]">
            <textarea
              value={output}
              readOnly
              placeholder="Hasil Akan tampil disini"
              className="border border-slate-700 rounded w-full h-48 py-2 px-3"
            />
            <button
              onClick={handleCopy}
              className="mt-4 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            >
              {copied ? 'Berhasil Copy!' : 'Copy Hasil'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
