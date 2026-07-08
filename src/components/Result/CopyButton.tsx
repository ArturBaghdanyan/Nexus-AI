import React from "react";
import { FaCopy } from "react-icons/fa";

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton = ({onClick}: CopyButtonProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200">
      <FaCopy />
    </div>
  );
};

export default CopyButton;
