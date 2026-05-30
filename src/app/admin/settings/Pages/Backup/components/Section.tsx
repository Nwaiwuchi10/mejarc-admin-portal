export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-800 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}