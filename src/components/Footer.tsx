export default function Footer() {
  return (
    <div className="flex flex-col bg-cyan-600 absolute bottom-0 justify-center items-center text-gray-100 w-full py-4 px-8 space-y-2 shadow-md">
      <p className="flex items-center justify-center text-l font-bold">
        &copy; EcomNext - {new Date().getFullYear()}
      </p>
      <p className="flex items-center justify-center text-sm font-bold">
        Created by Alexandre Fonseca
      </p>
    </div>
  );
}
