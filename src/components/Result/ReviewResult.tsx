"use client";

import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import CopyButton from "./CopyButton";
import PdfConvert from "./PdfConvert";
import { jsPDF } from "jspdf";
import { markdownComponents } from "./CodeBlock";
import { CopyModal } from "./CopyModal";

const ReviewResult = ({ result }: { result: string }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [showCopyModal, setShowCopyModal] = React.useState(false);

  if (!result) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setShowCopyModal(true);
    setTimeout(() => {
      setShowCopyModal(false);
    }, 1500);
  };

  const pdfConvert = () => {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("result.pdf");
  };

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-2xl mt-8 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-auto p-4">
      <span
        className="absolute top-4 right-4 text-2xl font-bold text-zinc-900 dark:text-white cursor-pointer"
        onClick={handleClose}
      >
        &times;
      </span>
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
        Review Result
      </h2>
      <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
        <ReactMarkdown components={markdownComponents as Components}>{result}</ReactMarkdown>
      </div>
      <div className="flex gap-3 items-center">
        <CopyButton onClick={copyToClipboard} />
        <PdfConvert onClick={pdfConvert} />
      </div>
      {showCopyModal && <CopyModal />}
    </div>
  );
};

export default ReviewResult;
