import React from "react";

export default function ProductAdminTableHeader() {
  return (
    <div className="text-white grid grid-cols-6 gap-6 justify-between py-2 px-4 bg-cyan-600 w-full">
      <div>IMAGE</div>
      <div>NAME</div>
      <div>CATEGORY</div>
      <div>DESCRIPTION</div>
      <div>PRICE</div>
    </div>
  );
}
