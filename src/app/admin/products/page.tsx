"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../types/product";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import { useProductData } from "../../../context/ProductContext";

type Props = {};

export default function AdminProducts({}: Props) {
  const { products } = useProductData();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategoryModal = () => {
    setIsOpen(!isOpen);
  };

  function filterProductsBySearchTerm(
    products: Product[],
    searchTerm: string
  ): Product[] {
    const filteredProducts = products.filter(
      (product) =>
        typeof product.name === "string" &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredProducts;
  }

  function filterProductsByCategory(
    products: Product[],
    category: string
  ): Product[] {
    const filteredProducts = products.filter(
      (product) =>
        typeof product.category === "string" &&
        product.category.toLowerCase().includes(category.toLowerCase())
    );

    return filteredProducts;
  }

  useEffect(() => {
    let combinedFilteredProducts = products;

    if (searchTerm) {
      combinedFilteredProducts = filterProductsBySearchTerm(
        combinedFilteredProducts,
        searchTerm
      );
    }

    if (selectedCategory) {
      combinedFilteredProducts = filterProductsByCategory(
        combinedFilteredProducts,
        selectedCategory
      );
    }

    // Update the state with the combined filters
    setFilteredProducts(combinedFilteredProducts);
  }, [products, searchTerm, selectedCategory]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);

    const newFilteredProducts = filterProductsByCategory(
      products,
      newSelectedCategory
    );
    setFilteredProducts(newFilteredProducts);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm != "") {
      const newFilteredProducts = filterProductsBySearchTerm(
        products,
        newSearchTerm
      );
      setFilteredProducts(newFilteredProducts);
    }
  };

  const categories: string[] = products
    .map((product) => product.category)
    .filter((value, index, self) => self.indexOf(value) === index);

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
            value={searchTerm}
            onChange={handleFilterChange}
          ></input>
          <select
            className="rounded-md bg-white shadow-md p-2 m-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
            defaultValue={""}
          >
            <option disabled value="disabled">
              Filter By Category
            </option>
            <option value="">All Categories</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <button
            onClick={toggleCategoryModal}
            className="rounded-lg shadow-lg text-sm bg-amber-500 hover:bg-orange-600 text-gray-100 p-2"
          >
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
        {filteredProducts.map((product) => {
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
              <div className="overflow-hidden text-overflow">
                {product.name}
              </div>
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
        })}
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="bg-white rounded-lg shadow p-6 m-4  mt-56 max-w-full max-h-full text-center overflow-auto z-50 ">
            <h1 className="text-xl font-bold mb-4">New Category</h1>

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
      )}
    </>
  );
}
