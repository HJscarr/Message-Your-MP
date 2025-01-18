'use client';

export default function InspiredBy() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">
        Inspired by (but not affiliated with){" "}
        <a
          href="https://www.youtube.com/garyseconomics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline font-medium transition-colors duration-200"
        >
          Gary&apos;s Economics
        </a>
      </p>
      <p className="text-sm text-gray-500">
        The below data is required by your MP to prove you are human, we do not store any of your data
      </p>
    </div>
  );
} 