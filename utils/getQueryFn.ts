export const getQueryFn = (url: string) => async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch audit logs");
  }

  return response.json();
};
