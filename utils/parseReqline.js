function parseReqline(reqline) {
  const lines = reqline.trim().split('\n');
  const firstLine = lines[0];
  const [method, path] = firstLine.split(' ');

  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    throw new Error('Invalid HTTP method. Only GET and POST are supported');
  }

  let query = {};
  let url = path;

  if (path.includes('?')) {
    const [baseUrl, queryString] = path.split('?');
    url = baseUrl;
    query = Object.fromEntries(new URLSearchParams(queryString));
  }

  return {
    method,
    url: `https://dummyjson.com${url}`,
    query,
    headers: {},
    body: {},
  };
}

module.exports = { parseReqline };
