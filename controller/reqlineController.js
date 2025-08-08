const Reqline = require('../model/reqlineModel')


const parseReqline = (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: "Request line is required" });
  }

  const parts = reqline.trim().split(' ');

  if (parts.length !== 3) {
    return res.status(400).json({ error: "Invalid request line format" });
  }

  const [method, fullUrl, httpVersion] = parts;

  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    return res.status(400).json({ error: "Invalid HTTP method. Only GET and POST are supported" });
  }

  const [path, queryString] = fullUrl.split('?');
  const query = {};

  if (queryString) {
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      query[key] = decodeURIComponent(value || '');
    });
  }

  const timestamp = Date.now();

  res.json({
    method,
    path,
    query,
    httpVersion,
    timestamp,
    duration: `${Date.now() - timestamp}ms`
  });
};


module.exports = {parseReqline}