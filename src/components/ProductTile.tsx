import React, { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import Image from "next/image";

import { Product } from "../types/product";
import UpdateObjectModal from "./UpdateObjectModal";
import ToggleObjectModal from "./ToggleObjectModal";

interface IProductTileProps {
  product: Product;
}

export default function ProductTile({ product }: IProductTileProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleUpdateObjectModal = () => {
    setIsUpdateOpen(!isUpdateOpen);
    if (isUpdateOpen) {
      window.location.reload();
    }
  };

  const toggleToggleObjectModal = () => {
    setIsDeleteOpen(!isDeleteOpen);
    if (isDeleteOpen) {
      window.location.reload();
    }
  };

  return (
    <div
      key={product.id}
      className={`${
        !product.isActive
          ? "bg-gray-500 cursor-not-allowed"
          : "even:bg-gray-100 odd:bg-white hover:bg-cyan-50 transition duration-300 ease-in-out"
      }   w-full grid grid-cols-6 gap-6 items-center justify-center py-2 px-4`}
    >
      <div>
        <Image
          alt={product.name}
          src={product.imageUrl}
          className={`${!product.isActive ? "grayscale" : ""} 
              w-16 h-16 rounded-full`}
          width={40}
          height={40}
        />
      </div>
      <div className="overflow-hidden text-overflow">{product.name}</div>
      <div>{product.category}</div>
      <div>{product.description}</div>
      <div>{product.price.toFixed(2)}</div>
      <div className="flex flex-row flex-wrap xs:space-y-2  xl:space-x-2 lg:space-x-2 md:space-x-2 ">
        <button
          className={`p-1  rounded-md ${
            product.isActive
              ? "cursor-pointer bg-cyan-600 hover:bg-cyan-800"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          <FaEdit
            onClick={product.isActive ? toggleUpdateObjectModal : null}
            className="h-6 w-6 items-center justify-center text-white "
          />
        </button>
        <button
          className={`p-1  rounded-md ${
            product.isActive
              ? "bg-red-600 hover:bg-red-800"
              : "bg-green-600 hover:bg-green-800"
          }`}
        >
          <FaPowerOff
            onClick={toggleToggleObjectModal}
            className="h-6 w-6 items-center justify-center text-white cursor-pointer"
          />
        </button>
      </div>
      {isUpdateOpen && (
        <UpdateObjectModal
          toggleUpdateObjectModal={toggleUpdateObjectModal}
          product={product}
        />
      )}
      {isDeleteOpen && (
        <ToggleObjectModal
          toggleToggleObjectModal={toggleToggleObjectModal}
          product={product}
        />
      )}
    </div>
  );
}
