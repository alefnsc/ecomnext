import { useCategoryData } from "@/contexts/CategoryContext";
import { Product } from "@/types/product";
import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

interface INewObjectModalProps {
  toggleNewObjectModal: () => void;
  objectName?: string;
  product?: Product;
}

export default function NewObjectModal({
  objectName,
  toggleNewObjectModal,
  product,
}: INewObjectModalProps) {
  const { categories } = useCategoryData();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [isSending, setIsSending] = useState<boolean>(false);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selectedFile = files[0];
    setImageFile(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (product) {
      return product.imageUrl;
    }

    if (!imageFile) {
      return null;
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile, product]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    let name: string,
      description: string,
      price: string,
      chosenCategory: string;

    const endpointName = objectName === "Product" ? "products" : "categories";

    setIsSending(true);

    const body = new FormData();

    name = nameRef.current!.value;
    description = descriptionRef.current!.value;

    body.append("name", name);
    body.append("description", description);

    if (objectName === "Product") {
      price = priceRef.current!.value;
      chosenCategory = selectedCategory;
      body.append("price", price);
      body.append("category", chosenCategory);
      if (imageFile) {
        body.append("image", imageFile);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/${endpointName}`,
      {
        method: "POST",
        body,
      }
    );
    console.log(response);
    toggleNewObjectModal();
    setIsSending(false);
  }

  const customImgLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white rounded-lg shadow p-6 m-4 max-w-full max-h-full text-center overflow-auto z-50  min-w-[50%]">
        <h1 className="text-xl font-bold mb-4">New {objectName}</h1>
        {isSending && (
          <div className="flex flex-col">
            <IoReload className="w-8 h-8 animate-spin" />
            Creating {objectName}...
          </div>
        )}
        {!isSending && (
          <form onSubmit={handleSubmit} id="form" name="form">
            <div className="sm:flex-col flex-col flex flex-1 md:flex-col lg:flex-row xl:flex-row max-w-[100%] justify-center items-center space-x-12 ">
              {objectName === "Product" && (
                <div className="max-w-[40%] w-[100%] flex flex-col">
                  <label
                    htmlFor="product-image"
                    className="relative border flex rounded-md cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 w-full aspect-square"
                  >
                    {previewURL ? (
                      <Image
                        loader={customImgLoader}
                        src={previewURL}
                        className=""
                        alt="Product preview"
                        fill={true}
                      />
                    ) : (
                      <>
                        <FaFileImage className="w-4 h-4" />
                        Choose an image
                      </>
                    )}
                  </label>

                  <input
                    type="file"
                    id="product-image"
                    required={true}
                    accept="image/png, image/jpeg"
                    className="sr-only"
                    onChange={handleFileSelected}
                  />
                </div>
              )}
              <div className="max-w-[60%] flex flex-col">
                <div className="justify-start grid grid-cols-2 items-center gap-4">
                  <div className="items-start text-left">Name:</div>
                  <input
                    required={true}
                    ref={nameRef}
                    name="name"
                    id="name"
                    className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
                    type="text"
                    placeholder={`${objectName} name`}
                  />
                  <div className="items-start text-left">Description:</div>
                  <textarea
                    required={true}
                    ref={descriptionRef}
                    name="description"
                    id="description"
                    className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
                  ></textarea>
                  {objectName === "Product" && (
                    <>
                      <div className="items-start text-left">Category:</div>
                      <select
                        className="rounded-md bg-white shadow-md p-2 m-2"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        defaultValue={""}
                      >
                        <option disabled selected>
                          Select a Category
                        </option>

                        {categories.map((category) => {
                          return (
                            <option key={category.id} value={category.name}>
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
                        ref={priceRef}
                        name="price"
                        id="price"
                        className="mt-4 border text-black p-2 hover:bg-gray-200 rounded-lg shadow-lg"
                        type="number"
                        placeholder="0.00"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
              <button
                onClick={toggleNewObjectModal}
                className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-4 border text-gray-100 p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
