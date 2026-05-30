export  function PrimaryButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-2 rounded-lg font-medium transition">
      {children}
    </button>
  );
}

export  function SecondaryButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="text-sm px-4 py-1.5 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition">
      {children}
    </button>
  );
}