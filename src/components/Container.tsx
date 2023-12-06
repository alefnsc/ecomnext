interface IContainerProps {
  title: String;
  children: React.ReactNode;
}

export default function Container({ title, children }: IContainerProps) {
  return (
    <>
      <div className="flex flex-col p-10 my-10 m-auto items-center justify-center rounded-xl bg-gray-100 shadow-sm max-w-[1200px] w-full">
        <div>
          <h1 className="text-4xl font-bold my-6">{title}</h1>
        </div>

        {children}
      </div>
    </>
  );
}
