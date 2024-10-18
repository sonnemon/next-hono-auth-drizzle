import { useState, useEffect } from 'react';

const useSession = () => {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setSession(data);
        setStatus('authenticated');
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setStatus('unauthenticated');
      }
    };

    fetchSession();

    // Refetch session every 5 minutes
    const intervalId = setInterval(fetchSession, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { session, status };
};

export default useSession;
