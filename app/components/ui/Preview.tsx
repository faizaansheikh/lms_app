import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export function Preview({ content }: any) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} // 👈 allows inline HTML
    >
      {content}
    </ReactMarkdown>
  );
}
