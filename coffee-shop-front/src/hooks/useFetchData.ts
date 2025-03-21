import { useQuery } from '@tanstack/react-query';

const fetchData = async (id?: string) => {
  const url = id
    ? `http://localhost:3000/api/products/${id}`
    : 'http://localhost:3000/api/products';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useFetchData = (id?: string) => {
  return useQuery({
    queryKey: ['fetchData', id],
    queryFn: () => fetchData(id),
  });
};
