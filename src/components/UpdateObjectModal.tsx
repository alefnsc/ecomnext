import { useCategoryData } from "@/contexts/CategoryContext";
import { Product } from "@/types/product";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

interface IUpdateObjectModal {
  toggleUpdateObjectModal: () => void;
  product: Product;
}

export default function UpdateObjectModal({
  toggleUpdateObjectModal,
  product,
}: IUpdateObjectModal) {
  const { categories } = useCategoryData();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setSelectedCategory(product.category);
  }, [product]);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selectedFile = files[0];
    setImageFile(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (product && product.imageUrl && !imageFile) {
      return product.imageUrl;
    }

    if (!imageFile || !product) {
      return null;
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile, product]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    setIsSending(true);

    const body = new FormData();

    body.append("name", name);
    body.append("description", description);
    body.append("price", price);
    body.append("category", selectedCategory);

    if (imageFile) {
      body.append("image", imageFile);
    } else {
      body.append("imageUrl", product.imageUrl);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${product.id}`,
      {
        method: "PUT",
        body,
      }
    );
    console.log(response);

    setIsSending(false);
  }

  const customImgLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white rounded-lg shadow p-6 m-4 max-w-full max-h-full text-center overflow-auto z-50  min-w-[50%]">
        <h1 className="text-xl font-bold mb-4">Update Product</h1>
        {isSending && (
          <div className="flex flex-col">
            <IoReload className="w-8 h-8 animate-spin" />
            Updating Product...
          </div>
        )}
        {!isSending && (
          <form onSubmit={handleSubmit} id="form" name="form">
            <div className="sm:flex-col flex-col flex flex-1 md:flex-col lg:flex-row xl:flex-row max-w-[100%] justify-center items-center space-x-12 ">
              <div className="max-w-[40%] w-[100%] flex flex-col">
                <label
                  htmlFor="product-image"
                  className="relative border flex rounded-md cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 w-full aspect-square"
                >
                  {previewURL ? (
                    <>
                      <Image
                        loader={customImgLoader}
                        src={previewURL}
                        className="w-full h-auto"
                        alt="Product preview"
                        fill={true}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <FaFileImage className="w-4 h-4" />
                        Choose another image
                      </div>
                    </>
                  ) : (
                    <>
                      <FaFileImage className="w-4 h-4" />
                      Choose a image
                    </>
                  )}
                </label>

                <input
                  type="file"
                  id="product-image"
                  accept="image/png, image/jpeg"
                  className="sr-only"
                  onChange={handleFileSelected}
                />
              </div>
              <div className="max-w-[60%] flex flex-col">
                <div className="justify-start grid grid-cols-2 items-center gap-4">
                  <div className="items-start text-left">Name:</div>
                  <input
                    required={true}
                    value={name}
                    onChange={handleNameChange}
                    name="name"
                    id="name"
                    className="mt-4 border text-black p-2 hover:bg-gray-200 rounded-lg shadow-lg"
                    type="text"
                    placeholder={`Product name`}
                  />
                  <div className="items-start text-left">Description:</div>
                  <textarea
                    required={true}
                    value={description}
                    onChange={handleDescriptionChange}
                    name="description"
                    id="description"
                    className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
                  ></textarea>
                  <div className="items-start text-left">Category:</div>
                  <select
                    className="rounded-md bg-white shadow-md p-2 m-2"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    defaultValue={product.category}
                  >
                    <option disabled value="disabled">
                      Select a Category
                    </option>

                    {categories.map((category) => {
                      return (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="items-start text-left">Price:</div>
                  <input
                    required={true}
                    step=".01"
                    min={0.01}
                    value={price}
                    onChange={handlePriceChange}
                    name="price"
                    id="price"
                    className="mt-4 border text-black p-2 hover:bg-gray-200 rounded-lg shadow-lg"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
              <button
                onClick={toggleUpdateObjectModal}
                className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-4 border text-gray-100 p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
