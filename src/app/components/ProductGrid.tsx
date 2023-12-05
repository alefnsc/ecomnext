import React from "react";

export default function ProductGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-auto  justify-center">
      {children}
    </div>
  );
}
