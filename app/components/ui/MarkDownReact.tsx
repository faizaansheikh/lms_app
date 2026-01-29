"use client";

import { useRef, useState, useEffect } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useParams } from "next/navigation";

export default function MarkDownReact({ setData, data, edit }: any) {
  const params = useParams()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  // Undo/Redo stack
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Track textarea selection
  const updateSelection = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    setSelection({ start: ta.selectionStart, end: ta.selectionEnd });
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.addEventListener("select", updateSelection);
    ta.addEventListener("keyup", updateSelection);
    ta.addEventListener("click", updateSelection);

    // Undo / Redo keyboard support
    const keyHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", keyHandler);

    return () => {
      ta.removeEventListener("select", updateSelection);
      ta.removeEventListener("keyup", updateSelection);
      ta.removeEventListener("click", updateSelection);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [historyIndex, history]);

  // Push to history
  const pushHistory = (newMarkdown: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMarkdown);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    setHistoryIndex(historyIndex - 1);
    setMarkdown(history[historyIndex - 1]);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    setHistoryIndex(historyIndex + 1);
    setMarkdown(history[historyIndex + 1]);
  };

  // Convert Markdown to HTML
  const convertToHtml = async () => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(markdown);

    setHtml(String(file));
    setData(String(file))
  };

  // Toggle formatting (Bold, Italic, Headings, Color)
  const toggleFormat = (before: string, after = "") => {
    const ta = textareaRef.current;
    if (!ta) return;

    const { start, end } = selection;
    const selectedText = markdown.slice(start, end) || "text";

    const alreadyWrapped =
      markdown.slice(start - before.length, end + after.length) ===
      before + selectedText + after;

    const newText = alreadyWrapped
      ? markdown.slice(0, start - before.length) +
      selectedText +
      markdown.slice(end + after.length)
      : markdown.slice(0, start) +
      before +
      selectedText +
      after +
      markdown.slice(end);

    setMarkdown(newText);
    pushHistory(newText);

    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start;
      ta.selectionEnd = start + selectedText.length;
    }, 0);
  };

  // Apply list formatting (Bulleted / Numbered)
  const applyList = (type: "ul" | "ol") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { start, end } = selection;

    const selectedText = markdown.slice(start, end) || "List item";
    const lines = selectedText.split("\n");

    const formatted = lines
      .map((line, idx) =>
        type === "ul" ? `- ${line}` : `${idx + 1}. ${line}`
      )
      .join("\n");

    const newText =
      markdown.slice(0, start) + formatted + markdown.slice(end);

    setMarkdown(newText);
    pushHistory(newText);

    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start;
      ta.selectionEnd = start + formatted.length;
    }, 0);
  };

  useEffect(() => {
    if (params?.id !== 'new') {
      setMarkdown(edit)
    }
  }, [edit])

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-50">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => toggleFormat("# ")}
        >
          H1
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => toggleFormat("## ")}
        >
          H2
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleFormat("**", "**")}
        >
          Bold
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleFormat("*", "*")}
        >
          Italic
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() =>
            toggleFormat('<span style="color:red;">', "</span>")
          }
        >
          Color
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() =>
            toggleFormat('<span style="font-size:24px;">', "</span>")
          }
        >
          Font Size
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() => toggleFormat("![image](https://picsum.photos/300)")}
        >
          Image
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() => applyList("ul")}
        >
          • Bulleted List
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
          onClick={() => applyList("ol")}
        >
          1. Numbered List
        </button>
        <button
          className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
          onClick={convertToHtml}
        >
          Convert to HTML
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Editor */}
        <textarea
          ref={textareaRef}
          className="flex-1 border rounded-md p-3 w-full min-h-[300px] resize-y"
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
            pushHistory(e.target.value);
          }}
          placeholder="Select text and click toolbar..."
        />

        {/* Rendered Output */}
        <div className="flex-1 flex flex-col border rounded-md p-3 overflow-auto max-h-[80vh] bg-white">
          <h3 className="mb-2 font-semibold text-lg">Rendered Output</h3>
          <div
            className="prose max-w-full break-words"
            dangerouslySetInnerHTML={{ __html: html || data }}
          />
        </div>
      </div>
    </div>
  );
}
