const normalizeUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const config = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL || 'https://wre-server-production.up.railway.app',
};


export default config;