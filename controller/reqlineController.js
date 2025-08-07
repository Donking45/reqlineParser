const Reqline = require('../model/reqlineModel')

// Helper function
function parseReqline(reqline) {
  const [method, url] = reqline.trim().split(/\s+/);

  if (!method || !url) {
    throw new Error("Invalid request line format");
  }

  if (!['GET', 'POST'].includes(method.toUpperCase())) {
    throw new Error("Invalid HTTP method. Only GET and POST are supported");
  }

  return { method: method.toUpperCase(), url };
}



const reqline = async (req, res) => {
  const { reqline } = req.body;

  if (!reqline) {
    return res.status(400).json({ error: "Invalid HTTP method. Only GET and POST are supported" });
  }

  try {
    const parsed = parseReqline(reqline);
    res.json(parsed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { reqline}
