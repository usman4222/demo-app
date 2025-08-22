"use client";

export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex justify-center items-center gap-2 text-gray-600 dark:text-gray-300 py-4">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-teal-600 rounded-full animate-spin" />
      <span>{text}</span>
    </div>
  );
}
