"use client";

import { useEffect, useState } from "react";

import { Product } from "../../../types/product";

import { useProductData } from "../../../context/ProductContext";

import {
  filterProductsByCategory,
  filterProductsBySearchTerm,
} from "../../../helpers/filteringHelpers";

import NewObjectModal from "../../../components/NewObjectModal";
import NewObjectButton from "../../../components/NewObjectButton";
import ProductTile from "../../../components/ProductTile";
import ProductAdminTableHeader from "../../../components/ProductAdminTableHeader";

type Props = {};

export default function AdminProducts({}: Props) {
  const { products } = useProductData();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [objectName, setObjectName] = useState("");

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

  const toggleObjectModal = (objectName?: string) => {
    setIsOpen(!isOpen);
    setObjectName(objectName);
  };

  return (
    <>
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

          <NewObjectButton
            toggleObjectModal={toggleObjectModal}
            objectName="Category"
            bgColor="bg-amber-500"
            bgHoverColor="bg-orange-600"
          />

          <NewObjectButton
            toggleObjectModal={toggleObjectModal}
            objectName="Product"
            bgColor="bg-green-600"
            bgHoverColor="bg-lime-800"
          />
        </div>

        <ProductAdminTableHeader />

        {filteredProducts.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
      {isOpen && (
        <NewObjectModal
          toggleCategoryModal={toggleObjectModal}
          objectName={objectName}
        />
      )}
    </>
  );
}
