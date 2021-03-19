import "./app.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import React, { useState } from "react";

function formatJson(input: string): string {
  if (input.trim().length === 0) return "";

  try {
    return JSON.stringify(JSON.parse(input), null, 2);
  } catch (e) {
    return e.toString();
  }
}

function highlight(input: string) {
  return hljs.highlightAuto(input).value;
}

export default function App() {
  const [input, setInput] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="textarea-wrapper">
      <textarea onChange={handleChange}></textarea>
      <pre className="result">
        <code
          className="hljs language-json"
          dangerouslySetInnerHTML={{ __html: highlight(formatJson(input)) }}
        ></code>
      </pre>
    </div>
  );
}
