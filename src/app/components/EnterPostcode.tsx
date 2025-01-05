'use client';

import { useState } from 'react';
import { useMPDetails } from '@/hooks/useFindEmail';
import EmailContents from './EmailContents';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import Notification from './Notification';
import GradientButton from './GradientButton';
import InspiredBy from './InspiredBy';

export default function EnterPostcode() {
  const { loading, error, mpDetails, getMPDetails } = useMPDetails();
  const [postcode, setPostcode] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // UK postcode regex pattern
  const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  const isValidPostcode = postcodePattern.test(postcode.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPostcode) {
      getMPDetails(postcode);
    }
  };

  const handleCopyEmail = async () => {
    if (mpDetails?.email) {
      try {
        await navigator.clipboard.writeText(mpDetails.email);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!mpDetails ? (
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Demand your MP take action on Wealth Inequality
          </h1>
          <InspiredBy />
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
              <GradientButton
                type="submit"
                disabled={loading || !isValidPostcode}
                className="mt-6 w-full justify-center"
              >
                {loading ? 'Finding MP...' : 'Find my MP'}
              </GradientButton>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-sm mx-auto space-y-6">
            <p className="text-center text-gray-600 md:mt-0 -mt-8">
              Below is your MP&apos;s email address and a generated message, consider editing the message to make it unique
            </p>
            <div className="relative p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold text-gray-900">{mpDetails.name}</h2>
              <p className="mt-1 text-sm text-gray-600">Email: {mpDetails.email || 'Not available'}</p>
              {mpDetails.email && (
                <button
                  onClick={handleCopyEmail}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Copy email address"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          <EmailContents 
            mpName={mpDetails.name}
            constituency={mpDetails.constituency}
            email={mpDetails.email}
          />
        </>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
      )}
      
      <Notification 
        show={showNotification}
        setShow={setShowNotification}
        message="MP's email address copied to clipboard"
      />
    </div>
  );
} 