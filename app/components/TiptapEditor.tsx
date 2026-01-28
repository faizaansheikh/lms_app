"use client";

import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiBold, FiItalic, FiList } from "react-icons/fi";
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import HardBreak from "@tiptap/extension-hard-break";
const TiptapEditor = ({ value, onChange }: any) => {
    const isContentLoaded = useRef(false); // 👈 IMPORTANT

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                hardBreak: false, // disable default
            }),
            HardBreak.configure({
                HTMLAttributes: {
                    class: "line-break",
                },
            }),
            BulletList,
            OrderedList,
            ListItem,
            Paragraph,
        ],
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
         immediatelyRender: false,
    });


    // ✅ SET CONTENT ONLY ONCE
    useEffect(() => {

        if (editor && value && !isContentLoaded.current) {
            editor.commands.setContent(value);
            isContentLoaded.current = true;
        }
    }, [editor, value]);

    if (!editor) return null;

    const btn = (active: any) =>
        `p-2 border rounded ${active ? "bg-blue-600 text-white" : "bg-white"
        }`;

    return (
        <div className="border rounded-lg bg-white">
            <div className="flex gap-1 border-b p-2">
                <button className={btn(editor.isActive("bold"))}
                    onClick={() => editor.chain().focus().toggleBold().run()}>
                    <FiBold />
                </button>

                <button className={btn(editor.isActive("italic"))}
                    onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <FiItalic />
                </button>

                <button className={btn(editor.isActive("bulletList"))}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <FiList />
                </button>

                <button className={btn(editor.isActive("orderedList"))}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    List
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="min-h-[250px] p-4 prose max-w-none"
            />
        </div>
    );
};

export default TiptapEditor;
