const Reqline = require('../model/reqlineModel');

const reqline = async (req, res) => {
  const start = Date.now();

  const { method, url, headers, query, body: requestBody } = req.body;

  // Validate method
  if (!['GET', 'POST'].includes(method)) {
    return res.status(400).json({
      error: "Invalid HTTP method. Only GET and POST are supported",
    });
  }

  try {
    // Save to DB
    const newReqline = new Reqline({
      method,
      url,
      headers,
      query,
      body: requestBody,
    });

    const savedReqline = await newReqline.save();

    const end = Date.now();

    res.status(201).json({
      message: "Request line parsed and saved successfully",
      data: savedReqline,
      timestamps: {
        createdAt: savedReqline.createdAt.getTime(),
        updatedAt: savedReqline.updatedAt.getTime(),
      },
      duration: `${end - start}ms`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { reqline };
