'use client';

import { useState } from 'react';
import { useMPDetails } from '@/hooks/useFindEmail';
import EmailContents from './EmailContents';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import Notification from './Notification';
import GradientButton from './GradientButton';
import InspiredBy from './InspiredBy';
import UserInput from './UserInput';

export default function EnterPostcode() {
  const { loading, error, mpDetails, getMPDetails } = useMPDetails();
  const [postcode, setPostcode] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [emailSubject, setEmailSubject] = useState('How are you going to deal with Wealth Inequality?');
  const [copyType, setCopyType] = useState<'email' | 'subject'>('email');

  // UK postcode regex pattern
  const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  const isValidPostcode = postcodePattern.test(postcode.trim());
  const isValidForm = fullName.trim() !== '' && address.trim() !== '' && isValidPostcode && telephone.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      getMPDetails(postcode);
    }
  };

  const handleCopyEmail = async () => {
    if (mpDetails?.email) {
      try {
        await navigator.clipboard.writeText(mpDetails.email);
        setCopyType('email');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  const handleCopySubject = async () => {
    try {
      await navigator.clipboard.writeText(emailSubject);
      setCopyType('subject');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      console.error('Failed to copy subject:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!mpDetails ? (
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl -mt-12">
            Demand your MP take action on Wealth Inequality
          </h1>
          <InspiredBy />
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <UserInput
                id="fullName"
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                placeholder="John Smith"
              />
              
              <UserInput
                id="address"
                label="House Number and Street"
                value={address}
                onChange={setAddress}
                placeholder="123 Example Street"
              />
              
              <UserInput
                id="postcode"
                label="Postcode"
                value={postcode}
                onChange={setPostcode}
                placeholder="e.g. SW1A 1AA"
              />

              <UserInput
                id="telephone"
                label="Telephone Number"
                value={telephone}
                onChange={setTelephone}
                placeholder="e.g. 07123456789"
              />

              <GradientButton
                type="submit"
                disabled={loading || !isValidForm}
                className="mt-6 w-full justify-center"
              >
                {loading ? 'Finding MP...' : 'Find MP & Generate Email'}
              </GradientButton>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-lg mx-auto space-y-6">
            <p className="text-center text-gray-600 md:mt-0 -mt-8 text-base">
              Please <span className="font-bold">edit/personalise the subject and message</span> below to make it unique & more likely to pass spam filters.
            </p>
            <div className="relative p-4 bg-gray-50 rounded-lg space-y-3">
              <h2 className="font-semibold text-gray-900">{mpDetails.name}</h2>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Email:</span> {mpDetails.email || 'Not available'}
              </p>
              <div className="relative pr-8">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Subject:</span>
                </p>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-indigo-600 focus:outline-none pb-1 mt-1"
                  placeholder="Email subject..."
                />
                <button
                  onClick={handleCopySubject}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Copy subject"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
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
            fullName={fullName}
            address={address}
            postcode={postcode}
            telephone={telephone}
            subject={emailSubject}
          />
        </>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
      )}
      
      <Notification 
        show={showNotification}
        setShow={setShowNotification}
        message={copyType === 'email' 
          ? "MP's email address copied to clipboard" 
          : "Email subject copied to clipboard"
        }
      />
    </div>
  );
} 