import React from "react";

interface INewObjectButtonProps {
  toggleObjectModal: (objectName: string) => void;
  objectName: string;
  bgColor?: string;
  bgHoverColor?: string;
}

export default function NewObjectButton({
  toggleObjectModal: toggleCategoryModal,
  objectName,
  bgColor = "bg-cyan-600",
  bgHoverColor = "hover:bg-cyan-700",
}: INewObjectButtonProps) {
  return (
    <button
      onClick={() => toggleCategoryModal(objectName)}
      className={`rounded-lg shadow-lg text-sm text-gray-100 p-2 ${
        bgColor + " hover:" + bgHoverColor
      } `}
    >
      New {objectName}
    </button>
  );
}
