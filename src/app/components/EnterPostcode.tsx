'use client';

import { useState } from 'react';
import { useMPDetails } from '@/hooks/useFindEmail';
import EmailContents from './EmailContents';

export default function EnterPostcode() {
  const { loading, error, mpDetails, getMPDetails } = useMPDetails();
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getMPDetails(postcode);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="postcode" className="block text-sm/6 font-medium text-gray-900">
            Enter your postcode
          </label>
          <div className="mt-2">
            <input
              id="postcode"
              name="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. SW1A 1AA"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {loading ? 'Finding MP...' : 'Find my MP'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
        
        {mpDetails && (
          <>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold text-gray-900">{mpDetails.name}</h2>
              <p className="mt-1 text-sm text-gray-600">Email: {mpDetails.email || 'Not available'}</p>
            </div>
          </>
        )}
      </div>
      
      {mpDetails && (
        <EmailContents 
          mpName={mpDetails.name}
          constituency={mpDetails.constituency}
          email={mpDetails.email}
        />
      )}
    </div>
  );
} 