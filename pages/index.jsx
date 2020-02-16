import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    window.location.href = '/feed';
  }, []);

  return null;
};

export default Index;
