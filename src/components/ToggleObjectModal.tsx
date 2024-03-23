import { Product } from "@/types/product";

interface IToggleObjectModal {
  toggleToggleObjectModal: () => void;
  product: Product;
}

export default function ToggleObjectModal({
  toggleToggleObjectModal,
  product,
}: IToggleObjectModal) {
  const handleObjectToggle = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${product.id}/toggleProduct`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toggleToggleObjectModal();
  };

  const toggleVerbiage = product.isActive ? "inactivate" : "activate";

  const toggleVerbiageProperCase =
    toggleVerbiage.charAt(0).toUpperCase() + toggleVerbiage.slice(1);

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white rounded-lg shadow p-6 m-4 max-w-full max-h-full text-center overflow-auto z-50  min-w-[50%]">
        <h1 className="text-xl font-bold mb-4">
          {toggleVerbiageProperCase} Product
        </h1>
        <div className="flex flex-col justify-center items-center space-y-4">
          <p>
            Are you sure you want to {toggleVerbiage} {product.name}?
          </p>
        </div>
        <div className="flex flex-row justify-center space-x-4">
          <button
            onClick={toggleToggleObjectModal}
            className="mt-4 border text-black p-2   hover:bg-gray-200 rounded-lg shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleObjectToggle}
            className="mt-4 border text-gray-100 p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg"
          >
            {toggleVerbiageProperCase}
          </button>
        </div>
      </div>
    </div>
  );
}
