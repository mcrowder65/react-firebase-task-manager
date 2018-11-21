import "isomorphic-fetch";

export const fetcher = async (...args) => {
  const result = await fetch(...args);
  const contentType = result.headers.get("content-type");
  if (contentType.indexOf("application/json") !== -1) {
    return result.json();
  } else if (
    contentType.indexOf("text/plain") !== -1 ||
    contentType.indexOf("text/html") !== -1
  ) {
    return result.text();
  } else {
    throw new Error(`${contentType} not supported yet!`);
  }
};
