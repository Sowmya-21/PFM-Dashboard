import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '../ui/Button';

interface Account {
  account_id: string;
  name: string;
  balances: {
    available: number;
    current: number;
    limit?: number;
    iso_currency_code: string;
  };
  type: string;
  mask?: string;
}

interface PlaidLinkButtonProps {
  onAccountsLinked?: (accounts: Account[]) => void;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ onAccountsLinked }) => {
  const [linkToken, setLinkToken] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const getAuthToken = () => localStorage.getItem('token');

  // 1️⃣ Fetch the link token from backend
  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      console.error('No auth token found');
      return;
    }

    fetch('http://localhost:5000/api/plaid/create_link_token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.link_token) {
          setLinkToken(data.link_token);
        } else {
          console.error('No link token received:', data);
        }
      })
      .catch(err => console.error('Error fetching link token:', err));
  }, []);

  // 2️⃣ Success handler when Plaid link is completed
  const onSuccess = useCallback((public_token: string) => {
    console.log('Plaid success! Public token:', public_token);
    setLoading(true);

    const token = getAuthToken();

    // Exchange public_token for access_token
    fetch('http://localhost:5000/api/plaid/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ public_token }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Token exchange response:', data);

        // Fetch accounts after successful token exchange
        fetch('http://localhost:5000/api/plaid/accounts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log('Accounts fetched:', data);
            if (onAccountsLinked) {
              onAccountsLinked(data);
            }
          })
          .catch(err => console.error('Error fetching accounts:', err))
          .finally(() => setLoading(false));
      })
      .catch(err => {
        console.error('Token exchange error:', err);
        setLoading(false);
      });
  }, [onAccountsLinked]);

  // 3️⃣ Initialize Plaid link
  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <Button 
      onClick={() => open()} 
      disabled={!ready || !linkToken || loading}
      className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition"
    >
      {loading ? 'Loading...' : 'Connect a bank account'}
    </Button>
  );
};

export default PlaidLinkButton;