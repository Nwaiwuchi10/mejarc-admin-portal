export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
      {children}
    </div>
  );
}