const Reqline = require('../model/reqlineModel')
const axios = require('axios');

const parseReqline = (reqline) => {
  const [method, url] = reqline.trim().split(/\s+/);
  if (!method || !url) throw new Error('Invalid reqline format');

  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    throw new Error('Invalid HTTP method. Only GET and POST are supported');
  }

  return { method: method.toUpperCase(), url };
};

const reqline = async (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: 'Missing reqline' });
  }

  try {
    const { method, url } = parseReqline(reqline);

    const fullUrl = new URL(url);
    const query = Object.fromEntries(fullUrl.searchParams.entries());

    const request_start_timestamp = Date.now();

    let responseData;
    if (method === 'GET') {
      responseData = await axios.get(fullUrl.href);
    } else if (method === 'POST') {
      responseData = await axios.post(fullUrl.href, req.body.body || {});
    }

    const request_stop_timestamp = Date.now();
    const duration = request_stop_timestamp - request_start_timestamp;

    return res.status(200).json({
      request: {
        query,
        body: req.body.body || {},
        headers: req.body.headers || {},
        full_url: fullUrl.href,
      },
      response: {
        http_status: responseData.status,
        duration,
        request_start_timestamp,
        request_stop_timestamp,
        response_data: responseData.data,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { reqline}
