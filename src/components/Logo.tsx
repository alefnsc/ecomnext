import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center flex-row px-4">
      <Image src="/logo.png" width={150} height={67} alt="logo" />
    </div>
  );
}
