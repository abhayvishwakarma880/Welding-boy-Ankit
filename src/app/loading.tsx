export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Loading...</p>
      </div>
    </div>
  );
}
