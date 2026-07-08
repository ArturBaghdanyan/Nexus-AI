"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import CopyButton from "./CopyButton";
import PdfConvert from "./PdfConvert";
import { jsPDF } from "jspdf";
import { FiThumbsUp } from "react-icons/fi";

const CopyModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-xl">
        <FiThumbsUp className="text-3xl text-green-500" />
        <span className="text-zinc-900 dark:text-white">Copied text</span>
      </div>
    </div>
  );
};

const ReviewResult = ({ result }: { result: string }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [showCopyModal, setShowCopyModal] = React.useState(false);

  if (!result) return null;

  const handleClose = () => {
    setIsOpen(false);
    location.pathname = "/";
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
        <ReactMarkdown>{result}</ReactMarkdown>
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
