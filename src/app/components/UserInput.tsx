'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface UserInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function UserInput({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder
}: UserInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <div className="flex justify-center items-center">
        <label htmlFor={id} className="text-sm/6 font-medium text-gray-900 flex items-center">
          {label}
          <div className="ml-1 inline-flex items-center">
            <InformationCircleIcon 
              className="h-4 w-4 text-gray-500 hover:text-indigo-600 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute mt-1 ml-4 w-64 p-2 bg-gray-700 text-white text-xs rounded-md shadow-lg z-10 pointer-events-none">
                Required by your MP to prove you are human, we do not store any of your data
              </div>
            )}
          </div>
        </label>
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
} 