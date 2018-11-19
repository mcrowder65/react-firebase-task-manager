import "isomorphic-fetch";

export const fetcher = async (...args) => {
  const result = await fetch(...args);
  return result.json();
};
