"use client";
import Image from "next/image";

import Container from "../components/Container";

import { formatCurrency } from "../helpers/numberHelpers";

interface IProduct {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    category: string;
    isActive: boolean;
  };
}

export default function ProductView({ product }: IProduct) {
  return (
    <Container title={product.name}>
      <div className="flex flex-row items-center justify-center text-justify  max-w-[800]">
        <div className="flex flex-col  w-full  py-8 px-4 mx-4 my-6 ">
          <Image
            alt={product.name}
            src={product.imageUrl}
            width={200}
            height={200}
            className="object-cover w-64 h-64 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-96 lg:h-96 xl:w-96 xl:h-96 transform-gpu rounded-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-150 "
          />
          <div className="p-1 mt-4 ml-4 w-[50%] text-lg text-center bg-yellow-600 text-gray-100">
            {product.category}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-justify">
          <div className="p-4 w-[90%] text-lg">{product.description}</div>
          <div className="p-4 w-[90%] text-lg font-bold my-4 border-2">
            {formatCurrency(product.price)}
          </div>
          {product.isActive ? (
            <div>
              <div className="p-2 w-[90%] text-lg text-center text-green-700">
                Available
              </div>
              <button className="my-4 p-4 w-[90%] text-lg text-gray-100 bg-cyan-700 shadow-md hover:shadow-2xl transition duration-500 ease-in-out hover:shadow-cyan-600 hover:text-gray-900  ">
                Add to Cart
              </button>
            </div>
          ) : (
            <span className="p-4 w-[90%] text-lg">Unavailable</span>
          )}
        </div>
      </div>
    </Container>
  );
}
