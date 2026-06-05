"use client";
import { useState } from "react";
export default function Home() {
  const [phase, setPhase] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [roast, setRoast] = useState("");
  const parts = roast.split("---GLOW---");
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-2">Resume Roaster</h1>
      <p className="text-zinc-400 mb-12 text-lg">
        Upload your resume. We'll make you cry, then make you better.
      </p>
      {phase === "upload" && (
        <div className="border-2 border-dashed border-zinc-600 rounded-xl p-12 text-center hover:border-orange-400 transition-colors cursor-pointer">
          <p className="text-zinc-400 mb-4 text-sm">PDF files only</p>
          <input
            type="file"
            accept=".pdf"
            onChange={async (e) => {
              setPhase("processing");
              if (e.target.files !== null) {
                setFile(e.target.files[0]);
              }
              const formData = new FormData();
              formData.append("resume", e.target.files![0]);

              const res = await fetch("/api/roast", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();
              setRoast(data.result);
              setPhase("done");
            }}
          />
        </div>
      )}
      {phase === "processing" && (
        <div className="text-center">
          <p className="text-6xl mb-6">🔥</p>
          <p className="text-white text-2xl font-bold mb-2">
            Roasting your resume...
          </p>
          <p className="text-zinc-400">This might sting a little</p>
        </div>
      )}
      {phase === "done" && (
        <div className="w-full max-w-2xl mx-auto mt-8">
          <div className="bg-zinc-900 rounded-xl p-6 mb-6">
            <h2 className="text-orange-400 text-xl font-bold mb-4">
              🔥 The Roast
            </h2>
            <p className="text-white leading-relaxed">{parts[0]}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
            <h2 className="text-green-600 text-xl font-bold mb-4">
              ✨ The Glow Up
            </h2>
            <p className="text-zinc-800 leading-relaxed whitespace-pre-wrap">
              {parts[1]}
            </p>
          </div>
          <button
            className="w-full py-3 rounded-xl bg-zinc-900 text-white font-bold hover:bg-zinc-700"
            onClick={() => {
              setPhase("upload");
              setRoast("");
            }}
          >
            Roast another resume
          </button>
        </div>
      )}
    </main>
  );
}
