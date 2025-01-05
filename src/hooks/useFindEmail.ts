'use client';

import { useState } from 'react';

interface MPDetails {
  name: string;
  email: string | null;
  constituency: string;
  memberId: number;
}

interface ParliamentaryResponse {
  items: Array<{
    value: {
      id: number;
      name: string;
      currentRepresentation: {
        member: {
          value: {
            id: number;
            nameDisplayAs: string;
          };
        };
      };
    };
  }>;
}

interface ContactResponse {
  value: Array<{
    type: string;
    email?: string;
  }>;
}

export function useMPDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mpDetails, setMpDetails] = useState<MPDetails | null>(null);

  const getMPDetails = async (postcode: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Searching for MP with postcode:', postcode);
      
      // First API call to get constituency and MP details
      const response = await fetch(
        `https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${encodeURIComponent(postcode)}`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to find MP for this postcode');
      }

      const data = await response.json() as ParliamentaryResponse;
      console.log('Search response:', data);

      // Get the first (and should be only) result
      const constituencyData = data.items[0]?.value;
      if (!constituencyData) {
        throw new Error('No constituency found for this postcode');
      }

      const mpData = constituencyData.currentRepresentation?.member?.value;
      if (!mpData) {
        throw new Error('Could not find current MP for this constituency');
      }

      console.log('Found MP:', mpData.nameDisplayAs, 'ID:', mpData.id);

      // Get contact details
      const contactRes = await fetch(
        `https://members-api.parliament.uk/api/Members/${mpData.id}/Contact`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!contactRes.ok) {
        throw new Error('Failed to fetch MP contact details');
      }

      const contactData = await contactRes.json() as ContactResponse;
      console.log('Contact data:', contactData);
      
      // Find parliamentary office email
      const parliamentaryContact = contactData.value.find(
        contact => contact.type === 'Parliamentary office'
      );
      
      setMpDetails({
        constituency: constituencyData.name,
        name: mpData.nameDisplayAs,
        email: parliamentaryContact?.email || null,
        memberId: mpData.id
      });

    } catch (err) {
      console.error('Error in getMPDetails:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while finding your MP');
      setMpDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mpDetails,
    getMPDetails
  };
}