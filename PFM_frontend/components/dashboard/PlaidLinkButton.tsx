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

const PlaidLinkButton: React.FC = () => {
  const [linkToken, setLinkToken] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  // 1️⃣ Fetch the link token from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/plaid/create_link_token', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => setLinkToken(data.link_token))
      .catch(err => console.error('Error fetching link token:', err));
  }, []);

  // 2️⃣ Success handler when Plaid link is completed
  const onSuccess = useCallback((public_token: string) => {
    console.log('Plaid success! Public token:', public_token);
    setLoading(true);

    // Exchange public_token for access_token
    fetch('http://localhost:5000/api/plaid/exchange_public_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Token exchange response:', data);

        // Fetch accounts after successful token exchange
        fetch('http://localhost:5000/api/plaid/accounts')
          .then(res => res.json())
          .then(data => {
            console.log('Accounts fetched:', data);
            setAccounts(data); // ✅ Save accounts to state
          })
          .catch(err => console.error('Error fetching accounts:', err))
          .finally(() => setLoading(false));
      })
      .catch(err => {
        console.error('Token exchange error:', err);
        setLoading(false);
      });
  }, []);

  // 3️⃣ Initialize Plaid link
  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <div>
      <Button onClick={() => open()} disabled={!ready || !linkToken || loading}>
        {loading ? 'Loading...' : 'Connect a bank account'}
      </Button>

      {/* 4️⃣ Display sandbox accounts */}
      {accounts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Linked Accounts:</h2>
          <ul>
            {accounts.map(acc => (
              <li key={acc.account_id} className="p-2 border rounded mb-2">
                <p><strong>{acc.name}</strong> ({acc.type})</p>
                <p>Balance: ${acc.balances.current.toFixed(2)}</p>
                {acc.mask && <p>Account Mask: {acc.mask}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlaidLinkButton;
