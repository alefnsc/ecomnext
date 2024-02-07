import React from "react";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";

import { Product } from "../types/product";

interface IProductTileProps {
  product: Product;
}

export default function ProductTile({ product }: IProductTileProps) {
  return (
    <div
      key={product.id}
      className="even:bg-gray-100 odd:bg-white w-full grid grid-cols-6 gap-6 items-center justify-center py-2 px-4 hover:bg-cyan-50 "
    >
      <div> {product.id}</div>
      <div>
        <Image
          alt={product.name}
          src={product.imageUrl}
          className="w-16 h-16 rounded-full"
          width={40}
          height={40}
        />
      </div>
      <div className="overflow-hidden text-overflow">{product.name}</div>
      <div>{product.ProductStock?.length}</div>
      <div>{product.price}</div>
      <div className="flex flex-row flex-wrap xs:space-y-2  xl:space-x-2 lg:space-x-2 md:space-x-2 ">
        <button className="p-1 bg-cyan-600 rounded-md hover:bg-cyan-800 ">
          <FaEdit className="h-6 w-6 items-center justify-center text-white cursor-pointer" />
        </button>
        <button className="p-1 bg-red-600 rounded-md hover:bg-red-800">
          <MdDeleteForever className="h-6 w-6 items-center justify-center text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
