import { useQuery } from '@tanstack/react-query';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchData = async (id?: string) => {
  const url = id ? `${baseUrl}/api/products/${id}` : `${baseUrl}/api/products`;

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
