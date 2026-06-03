"use client"
import { useState } from "react"
export default function Home(){
  const [phase, setPhase] = useState("upload")
  const [file,setFile] = useState(null)
  return(
    <main>
      <h1>Reume Roaster</h1>
      {phase === "upload" && <div><p>upload your resume</p>
      <input type="file" /></div>
      }
      {phase ==="processing"&& <p>roasting in progress</p>}
      {phase === "done" && <p>here are your results</p>}
      </main>
  )
}