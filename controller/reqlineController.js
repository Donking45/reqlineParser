const Reqline = require('../model/reqlineModel')
const { parseReqline } = require('../utils/parseReqline');
const axios = require('axios');

const reqline = async (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: 'Missing reqline' });
  }

  let parsed;
  try {
    parsed = parseReqline(reqline);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { method, url, query, headers = {}, body = {} } = parsed;

  // Only support GET and POST
  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid HTTP method. Only GET and POST are supported' });
  }

  const fullUrl = url + (Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '');

  const request_start_timestamp = Date.now();

  try {
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data: body,
    });

    const request_stop_timestamp = Date.now();
    const duration = request_stop_timestamp - request_start_timestamp;

    return res.status(200).json({
      request: {
        query,
        body,
        headers,
        full_url: fullUrl,
      },
      response: {
        http_status: response.status,
        duration,
        request_start_timestamp,
        request_stop_timestamp,
        response_data: response.data,
      },
    });
  } catch (err) {
    const request_stop_timestamp = Date.now();
    const duration = request_stop_timestamp - request_start_timestamp;

    return res.status(err.response?.status || 500).json({
      request: {
        query,
        body,
        headers,
        full_url: fullUrl,
      },
      response: {
        http_status: err.response?.status || 500,
        duration,
        request_start_timestamp,
        request_stop_timestamp,
        response_data: err.response?.data || err.message,
      },
    });
  }
};


module.exports = { reqline}
