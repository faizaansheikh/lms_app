import TurndownService from "turndown";
import { marked } from "marked";

import { Extension } from "@tiptap/core";


export const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");


export const titleFromSlug = (slug: string) => {
    // 1. Replace hyphens with spaces
    let title = slug.replace(/-/g, " ");

    // 2. Capitalize words
    title = title.replace(/\b\w/g, c => c.toUpperCase());

    // 3. Add # before standalone number (Video 1 → Video #1)
    title = title.replace(/Video (\d+)/, "Video #$1");

    // 4. Convert last two numbers to time format (56 37 → (56:37))
    title = title.replace(/(\d+)\s(\d+)$/, "($1:$2)");

    return title;
};


export const getUser = () => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null
}
export const addLineBreaks = (html: string) =>
    html.replace(/\.([A-Z])/g, '.<br/>$1');


// extensions/FontSize.ts



export const FontSize = Extension.create({
    name: "fontSize",

    addGlobalAttributes() {
        return [
            {
                types: ["textStyle"],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize || null,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {};
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
});
export const turnDown = (html: any) => {


    const turndownService = new TurndownService();

    // Optional: enable GitHub-flavored markdown
    turndownService.addRule('gfm', {
        filter: ['b', 'strong', 'i', 'em', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'img', 'span', 'div'],
        replacement: (content, node) => {
            console.log(node.nodeName.toLowerCase(), content)
            switch (node.nodeName.toLowerCase()) {
                case "strong":
                case "b":
                    return `**${content}**`;
                case "em":
                case "i":
                    return `*${content}*`;
                case "h1":
                    return `# ${content}\n\n`;
                case "h2":
                    return `## ${content}\n\n`;
                case "h3":
                    return `### ${content}\n\n`;
                case "li":
                    const parent = node.parentNode;
                    if (parent && parent.nodeName === "OL") return `${Array.from(parent.children).indexOf(node) + 1}. ${content}\n`;
                    return `- ${content}\n`;
                case "img":
                    const src = node.getAttribute('src');
                    const alt = node.getAttribute('alt') || '';
                    return `![${alt}](${src})`;
                case "span": {
                    const style = node.getAttribute("style");
                    if (style) {
                        return `<span style="${style}">${content}</span>`;
                    }
                    return content;
                } 
                case "div": {
                    const style = node.getAttribute("style");
                    if (style) {
                        return `<div style="${style}">${content}</div>`;
                    }
                    return content;
                }

                default:
                    return content;
            }
        },
    });

    // Example
    // const html = `<h1>Heading</h1><p>This is <strong>bold</strong> text</p><ul><li>Item1</li><li>Item2</li></ul>`;
    const markdown = turndownService.turndown(html || `<h1>Heading</h1>`);
    return markdown
}
export const getHtml = (md: string) => {
    try {
        // marked.parse always returns string, no promise
        const rawHtml: any = marked.parse(md, {
            breaks: true, gfm: true
        });
        return rawHtml
    } catch (err) {
        console.error(err);
        return "";
    }
};