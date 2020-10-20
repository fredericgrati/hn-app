import fetch from "isomorphic-unfetch";

const fetcher = (url) =>
  fetch(url).then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  });

export default fetcher;
