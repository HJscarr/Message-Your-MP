'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import Notification from './Notification'

// Create a context for the email body
const EmailContext = createContext<{
  emailBody: string;
  setEmailBody: (body: string) => void;
  isEmailReady: boolean;
  setIsEmailReady: (ready: boolean) => void;
}>({
  emailBody: '',
  setEmailBody: () => {},
  isEmailReady: false,
  setIsEmailReady: () => {},
});

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailBody, setEmailBody] = useState('');
  const [isEmailReady, setIsEmailReady] = useState(false);
  return (
    <EmailContext.Provider value={{ emailBody, setEmailBody, isEmailReady, setIsEmailReady }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);

interface EmailContentsProps {
  mpName: string;
  constituency: string;
  email: string | null;
  fullName: string;
  address: string;
  postcode: string;
  telephone: string;
  subject: string;
}

export default function EmailContents({ 
  mpName, 
  constituency, 
  email, 
  fullName,
  address,
  postcode,
  telephone,
  subject,
}: EmailContentsProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setEmailBody, setIsEmailReady } = useEmail();
  const [showNotification, setShowNotification] = useState(false);

  // Format postcode to ensure correct spacing and capitalization
  const formatPostcode = (postcode: string) => {
    const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
    return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
  };

  // Auto-scroll effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText]);

  const emailTemplate = `Dear ${mpName},

How do you plan to deal with the exploding wealth inequality in the UK?

The richest 1% of Britons hold more wealth than 70 per cent of Britons, while the four richest Britons have more wealth than 20 million Britons.

How can we grow our economy when no one has any money to buy goods and services?

Asset prices are soaring due to the wealth explosion of the rich and as I'm sure you are aware there is growing unrest across the UK. This is shown by the uprising of far-right activists.

As the MP of ${constituency}, I feel it is your duty to raise this point in parliament.

I eagerly await your response.

Kind regards,
${fullName}

Address: ${address} ${formatPostcode(postcode)}
Tel: ${telephone}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= emailTemplate.length) {
        const newText = emailTemplate.slice(0, currentIndex);
        setDisplayedText(newText);
        setEmailBody(JSON.stringify({ email, body: newText, subject }));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        setIsEmailReady(true);
        clearInterval(typingInterval);
      }
    }, 5);

    return () => {
      clearInterval(typingInterval);
      setIsEmailReady(false);
    };
  }, [emailTemplate, setEmailBody, email, setIsEmailReady, subject]);

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
    setEmailBody(JSON.stringify({ email, body: e.target.value, subject }));
  };

  return (
    <>
      <div className="relative mt-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={isTypingComplete ? displayedText : displayedText + '|'}
          onChange={handleTextChange}
          className="w-full h-96 lg:h-72 p-4 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
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