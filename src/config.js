const normalizeUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const config = {
  SERVER_URL: `${normalizeUrl(process.env.REACT_APP_SERVER_URL)}`,
};


export default config;