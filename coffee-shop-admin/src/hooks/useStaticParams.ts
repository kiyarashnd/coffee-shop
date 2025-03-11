import { useEffect, useState } from 'react';

export function useStaticParams<T>(): Partial<T> {
  const [params, setQueryString] = useState<Partial<T>>({});

  function handleQueryChange() {
    setQueryString(
      Array.from(new URLSearchParams(window.location.search).entries()).reduce(
        (acc: any, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {}
      )
    );
  }

  useEffect(() => {
    handleQueryChange();
    window.addEventListener('popstate', handleQueryChange);
    return () => {
      window.removeEventListener('popstate', handleQueryChange);
    };
  }, []);

  return params;
}
