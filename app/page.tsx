"use client";
import { useState } from "react";
export default function Home() {
  const [phase, setPhase] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [roast, setRoast] = useState("");
  const parts = roast.split("---GLOW---");
  return (
    <main>
      <h1>Reume Roaster</h1>
      {phase === "upload" && (
        <div>
          <p>upload your resume</p>
          <input
            type="file"
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
      {phase === "processing" && <p>roasting in progress</p>}
      {phase === "done" && (
        <div>
          <p>here are your results</p>
          <p>{parts[0]}</p>
          <p>{parts[1]}</p>
        </div>
      )}
    </main>
  );
}
