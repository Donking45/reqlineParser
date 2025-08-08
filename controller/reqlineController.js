const Reqline = require('../model/reqlineModel')


const parseReqline = async (req, res) => {
  const { reqline } = req.body;

  const startTime = Date.now();

  if (!reqline) {
    return res.status(400).json({ error: "Request line is required" });
  }

  const parts = reqline.trim().split(' ');

  if (parts.length !== 3) {
    return res.status(400).json({ error: "Invalid request line format" });
  }

  const [method, path, httpVersion] = parts;

  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    return res.status(400).json({ error: "Invalid HTTP method. Only GET and POST are supported" });
  }

  const endTime = Date.now();

  res.json({
    method,
    path,
    httpVersion,
    startTimestamp: startTime,
    endTimestamp: endTime,
    duration: endTime - startTime
  });
};


module.exports = {parseReqline}