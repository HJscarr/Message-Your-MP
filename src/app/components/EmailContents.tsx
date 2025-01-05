'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import Notification from './Notification'

// Create a context for the email body
const EmailContext = createContext<{
  emailBody: string;
  setEmailBody: (body: string) => void;
}>({
  emailBody: '',
  setEmailBody: () => {},
});

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailBody, setEmailBody] = useState('');
  return (
    <EmailContext.Provider value={{ emailBody, setEmailBody }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);

interface EmailContentsProps {
  mpName: string;
  constituency: string;
  email: string | null;
}

export default function EmailContents({ mpName, constituency, email }: EmailContentsProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setEmailBody } = useEmail();
  const [showNotification, setShowNotification] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText]);

  const emailTemplate = `Dear ${mpName},

I would like to enquire what your plans to deal with the exploding wealth inequality of our constituency ${constituency} are.

Over COVID-19 pandemic the average billionaires wealth doubled and in the UK saw an increase of 29 billionaires.

House prices are soaring and the middle and lower classes are being forced to sell their assets to the super wealth that are growing at an *increasing* rate.

Kind regards,
[Your name]`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= emailTemplate.length) {
        const newText = emailTemplate.slice(0, currentIndex);
        setDisplayedText(newText);
        setEmailBody(JSON.stringify({ email, body: newText }));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 5);

    return () => clearInterval(typingInterval);
  }, [emailTemplate, setEmailBody, email]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textareaRef.current?.value || '');
      setShowNotification(true);
      // Auto-hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisplayedText(e.target.value);
    setEmailBody(JSON.stringify({ email, body: e.target.value }));
  };

  return (
    <>
      <div className="relative mt-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={isTypingComplete ? displayedText : displayedText + '|'}
          onChange={handleTextChange}
          className="w-full h-64 p-4 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          disabled={!isTypingComplete}
        />
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors"
          title="Copy to clipboard"
        >
          <ClipboardDocumentIcon className="h-5 w-5" />
        </button>
      </div>
      <Notification 
        show={showNotification}
        setShow={setShowNotification}
        message="The message has been copied to your clipboard"
      />
    </>
  );
} 