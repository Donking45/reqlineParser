const Reqline = require('../model/reqlineModel')


const parseReqline = (reqline) => {
  const parts = reqline.trim().split(' ');

  if (parts.length < 2 || parts.length > 3) {
    throw new Error("Invalid request line format");
  }

  const method = parts[0].toUpperCase();
  const url = parts[1];

  if (!['GET', 'POST'].includes(method)) {
    throw new Error("Invalid HTTP method. Only GET and POST are supported");
  }

  return { method, url };
};

const reqline = async (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: "Missing reqline in request body" });
  }

  const start = Date.now();

  try {
    const parsed = parseReqline(reqline);

    const duration = Date.now() - start;
    const timestamp = Date.now(); // current time in milliseconds

    return res.json({
      ...parsed,
      duration,
      timestamp
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { reqline };
