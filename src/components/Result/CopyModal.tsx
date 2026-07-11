import { FiThumbsUp } from "react-icons/fi";

export const CopyModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-xl">
        <FiThumbsUp className="text-3xl text-green-500" />
        <span className="text-zinc-900 dark:text-white">Copied text</span>
      </div>
    </div>
  );
};
