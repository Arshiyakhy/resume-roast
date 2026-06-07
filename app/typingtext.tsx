"use client";
import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
}
export default function TypingText({ text, speed = 20 }: Props) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (length >= text.length) return;

    const interval = setInterval(() => {
      setLength((prev) => prev + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [length, text, speed]);
  return <span>{text.slice(0, length)}</span>;
}
