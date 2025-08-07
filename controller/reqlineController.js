const Reqline = require('../model/reqlineModel')



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
