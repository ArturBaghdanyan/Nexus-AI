"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  if (!match) {
    // inline code
    return (
      <code className="bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between bg-zinc-800 text-zinc-300 text-xs px-4 py-1.5">
        <span className="font-mono">{match[1]}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={match[1]}
        style={vscDarkPlus}
        PreTag="div"
        customStyle={{ margin: 0, padding: "1rem", fontSize: "0.85rem" }}
        showLineNumbers
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

const markdownComponents = {
  code({ className, children }: { className?: string; children: React.ReactNode }) {
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
};

export { markdownComponents };
