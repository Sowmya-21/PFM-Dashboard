import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '../ui/Button';

// A mock link_token is used for demonstration.
// In a real application, you would fetch this from your server.
const MOCK_LINK_TOKEN = 'link-sandbox-a1b2c3d4-e5f6-7890-1234-567890abcdef';

const PlaidLinkButton: React.FC = () => {
  const onSuccess = useCallback((public_token: string, metadata: any) => {
    // In a real app, send the public_token to your server
    // to exchange it for an access_token.
    console.log('Plaid link success!', public_token, metadata);
  }, []);

  const { open, ready } = usePlaidLink({
    token: MOCK_LINK_TOKEN,
    onSuccess,
  });

  return (
    <Button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </Button>
  );
};

export default PlaidLinkButton;
