"use client";

import { getHtml } from "@/app/utility";
import { useState, useEffect, useRef } from "react";

let DOMPurify: any;
if (typeof window !== "undefined") {
  // Only import in browser
  DOMPurify = require("dompurify")(window);
}
import { useParams } from "next/navigation";

type Props = {
  onChangeHtml?: (html: string) => void;
  edit?: string;
};

const MarkDownReact = ({ onChangeHtml, edit }: Props) => {
  const params = useParams();
  const colorRef = useRef("#000000");

  const [markdown, setMarkdown] = useState<string>(edit || "");
  const [history, setHistory] = useState<string[]>([edit || ""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [color, setColor] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Colors for toolbar
  const colors = ["#f87171", "#34d399", "#60a5fa", "#facc15", "#a78bfa"];
  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px"];
  // Push current state to history
  const pushHistory = (newMarkdown: string) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newMarkdown);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // Wrap selected text utility
  const wrapSelection = (before: string, after: string = "") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Use selected text, or empty string (not "text")
    const selectedText = textarea.value.substring(start, end) || "";

    const newValue =
      textarea.value.substring(0, start) +
      before +
      (selectedText || "text") +
      after +
      textarea.value.substring(end);

    setMarkdown(newValue);
    pushHistory(newValue);

    // Set caret/selection
    const newSelectionStart = start + before.length;
    const newSelectionEnd = newSelectionStart + (selectedText || "text").length;

    textarea.selectionStart = newSelectionStart;
    textarea.selectionEnd = newSelectionEnd;
    textarea.focus();
  };


  // Apply color to selection
  const applyColor = (color: string) => {
    wrapSelection(`<span style="color:${color}">`, "</span>");
  };

  //Apply font size
  const applyFontSize = (size: string) => {
    wrapSelection(`<span style="font-size:${size};">`, "</span>");
  };

  // Toolbar actions
  const toolbarActions = {
    bold: () => wrapSelection("**", "**"),
    italic: () => wrapSelection("_", "_"),
    h1: () => wrapSelection("# ", ""),
    h2: () => wrapSelection("## ", ""),
    ul: () => wrapSelection("- ", ""),
    ol: () => wrapSelection("1. ", ""),
    image: () => wrapSelection("![Alt text](image-url)", ""),
    code: () => wrapSelection("```js\n", "\n```"),
    link: () => wrapSelection("[", "](https://)"),
    center: () => wrapSelection(`<p style="text-align: center;">`, "</p>"),
    color: () => applyColor(colorRef.current)
    
  };

  // Update parent with sanitized HTML
  useEffect(() => {
    const html = getHtml(markdown);
    const sanitized = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "b", "i", "strong", "em", "p", "h1", "h2", "h3", "ul", "ol", "li", "span", "img", "pre", "code", "a"
      ],
      ALLOWED_ATTR: ["style", "href", "src"]
    });
    onChangeHtml?.(sanitized);
  }, [markdown, onChangeHtml]);

  // Load existing edit content
  useEffect(() => {
    if (params?.id !== "new" && edit) {
      setMarkdown(edit);
      setHistory([edit]);
      setHistoryIndex(0);
    }
  }, [edit, params?.id]);

  // Undo / Redo with keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
      // Ctrl+Z => undo
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setMarkdown(history[historyIndex - 1]);
      }
    } else if ((e.ctrlKey && e.key === "y") || (e.ctrlKey && e.shiftKey && e.key === "Z")) {
      // Ctrl+Y or Ctrl+Shift+Z => redo
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setMarkdown(history[historyIndex + 1]);
      }
    }
  };
  
  return (
    <div className="mdr-wrapper">
      {/* Toolbar */}
      <div className="mdr-toolbar sticky top-0 bottom-0">

        <button onClick={toolbarActions.h1}>Heading</button>
        <button onClick={toolbarActions.h2}>Sub Heading</button>
        <button onClick={toolbarActions.bold}>B</button>
        <button onClick={toolbarActions.italic}>I</button>
        <button onClick={toolbarActions.ul}>Bullets</button>
        <button onClick={toolbarActions.ol}>Numbers</button>
        <button onClick={toolbarActions.center}>Center</button>
        <select
          onChange={(e) => applyFontSize(e.target.value)}
          defaultValue=""
          style={{ padding: "3px 4px", borderRadius: "4px", border: "1px solid #d1d5db" }}
        >
          <option value="" disabled>
            Font Size
          </option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button onClick={toolbarActions.image}>🖼 Image</button>

        {/* Color picker */}
        {/* {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, width: 24, height: 24, padding: 0 }}
            onClick={() => applyColor(color)}
          />
        ))} */}
        <input
          type="color"
          onInput={(e: any) => {
            colorRef.current = e.target.value;
          }} 
          style={{ width: 32, height: 32, border: "none", padding: 0 }}
          title="Pick custom color"
        />

        <button onClick={toolbarActions.color}>Apply color</button>
      </div>

      {/* Editor + Preview */}
      <div className="mdr-body">
        <textarea
          ref={textareaRef}
          placeholder="Write markdown..."
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
            pushHistory(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <div
          className="mdr-preview"
          dangerouslySetInnerHTML={{ __html: getHtml(markdown) }}
        />
      </div>

      {/* Scoped Styles */}
      <style jsx>{`
        .mdr-wrapper {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
        }

        .mdr-toolbar {
          display: flex;
          gap: 8px;
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          flex-wrap: wrap;
        }

        .mdr-toolbar button {
          padding: 4px 8px;
          font-size: 13px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.2s;
        }

        .mdr-toolbar button:hover {
          background: #f3f4f6;
        }

        .mdr-body {
          display: flex;
          flex-direction:row;
          min-height: 350px;
          gap: 8px;
          // flex-wrap: wrap;
        }

        textarea {
          width: 50%;
          min-width: 300px;
          padding: 12px;
          border: none;
          outline: none;
          resize: none;
          font-family: monospace;
          font-size: 14px;
        }
.mdr-preview {
  width: 50%;
  min-width: 300px;
  padding: 12px;
  background: #fafafa;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
       
      `}</style>
    </div>
  );
};

export default MarkDownReact;
