'use client'

import { EnvelopeIcon } from '@heroicons/react/24/outline'
import EnterPostcode from './components/EnterPostcode'
import { EmailProvider, useEmail } from './components/EmailContents'
import Link from 'next/link'

function MailtoButton() {
  const { emailBody, isEmailReady } = useEmail();
  const { email, body, subject } = JSON.parse(emailBody || '{"email":null,"body":"","subject":""}');
  
  const handleRefresh = () => {
    window.location.reload();
  };

  // Only include the email in the mailto link if it exists
  const mailtoLink = email 
    ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Only render if email is ready
  if (!isEmailReady) return null;

  return (
    <div className="flex flex-col items-center mt-10">
      <a
        href={mailtoLink}
        className="group relative inline-flex items-center px-8 py-3 text-lg font-medium text-white rounded-lg overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:opacity-80" />
        
        <div className="relative flex items-center space-x-2">
          <EnvelopeIcon className="w-6 h-6" />
          <span>Send Email</span>
        </div>
        
        <div className="absolute inset-0 transform translate-x-full group-hover:-translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </a>
      
      <Link
        href="/"
        onClick={handleRefresh}
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <EmailProvider>
      <div className="bg-white min-h-screen">
        <div className="relative isolate px-6 pt-24 lg:pt-16 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl space-y-8">
            <EnterPostcode />
            <MailtoButton />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </EmailProvider>
  );
}