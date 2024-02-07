import React from "react";

interface INewObjectModalProps {
  toggleCategoryModal: () => void;
  objectName?: string;
}

export default function NewObjectModal({
  toggleCategoryModal,
  objectName,
}: INewObjectModalProps) {
  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white rounded-lg shadow p-6 m-4  mt-56 max-w-full max-h-full text-center overflow-auto z-50 ">
        <h1 className="text-xl font-bold mb-4">New {objectName}</h1>

        <div className="flex flex-col items-center justify-center">
          <label htmlFor="categoryName">
            Name:
            <input
              type="text"
              className="rounded-md bg-white shadow-md p-2 m-2"
              placeholder="Category Name"
            ></input>
          </label>
          <label htmlFor="categoryDescription">
            Description:
            <input
              type="text"
              className="rounded-md bg-white shadow-md p-2 m-2"
              placeholder="Category Description"
            ></input>
          </label>
        </div>
        <div className="flex flex-row justify-center space-x-4">
          <button
            onClick={toggleCategoryModal}
            className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={toggleCategoryModal}
            className="mt-4 border text-gray-100 p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
