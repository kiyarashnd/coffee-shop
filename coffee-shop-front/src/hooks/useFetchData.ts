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
  const queryResult = useQuery({
    queryKey: ['fetchData', id],
    queryFn: () => fetchData(id),
    staleTime: 0, // همیشه بلافاصله استیل می‌شود
  });

  // اضافه کردن پراپرتی mutate که در واقع همان refetch است
  return { ...queryResult, mutate: queryResult.refetch };
};
