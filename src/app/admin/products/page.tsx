"use client";
import Container from "@/components/Container";

import { useProductData } from "../../customHooks/useProductData";

import { Product } from "@/types/product";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";

type Props = {};

export default function AdminProducts({}: Props) {
  const products: Product[] = useProductData();
  return (
    <>
      {/* productListCommands */}

      {/* productList */}

      <div className="flex flex-col items-center justify-center m-auto w-[80%] max-w-[1200px] min-w-[480px] mt-6 object-contain">
        <div className="flex flex-row space-x-2 my-2">
          <input
            type="text"
            className="rounded-md bg-white shadow-md p-2 m-2"
            placeholder="Search a product..."
          ></input>
          <select className="rounded-md bg-white shadow-md p-2 m-2">
            <option>teste</option>
            <option>teste</option>
          </select>
          <button className="rounded-lg shadow-lg text-sm bg-amber-500 hover:bg-orange-600 text-gray-100 p-2">
            New Category
          </button>
          <button className="rounded-lg shadow-lg text-sm  text-gray-100 py-2 bg-green-600 hover:bg-lime-800 p-2">
            New Product
          </button>
        </div>

        <div className="text-white grid grid-cols-6 gap-6 justify-between py-2 px-4 bg-cyan-600 w-full">
          <div>ID</div>
          <div>IMAGE</div>
          <div>NAME</div>
          <div>QTT</div>
          <div>PRICE</div>
        </div>
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="even:bg-gray-100 odd:bg-white w-full grid grid-cols-6 gap-6 items-center justify-center py-2 px-4 hover:bg-cyan-50 "
            >
              <div> {product.id}</div>
              <div>
                <Image
                  alt={product.title}
                  src={product.image}
                  className="w-16 h-16 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <div className="overflow-hidden text-overflow">
                {product.title}
              </div>
              <div>{product.quantity || 1}</div>
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
        })}
      </div>
    </>
  );
}
