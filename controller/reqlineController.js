const Reqline = require('../model/reqlineModel')

// Utility to validate JSON string
function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// Parser function
function parseReqline(input) {
  const parts = input.split(" | ");

  if (parts.length < 2) {
    throw new Error("Invalid reqline: At least HTTP and URL are required");
  }

  const result = {
    method: null,
    url: null,
    headers: {},
    query: {},
    body: {},
  };

  // Check mandatory HTTP
  if (!parts[0].startsWith("HTTP ")) {
    throw new Error("Reqline must start with 'HTTP [METHOD]'");
  }

  const method = parts[0].split(" ")[1];
  if (!["GET", "POST"].includes(method)) {
    throw new Error("Invalid HTTP method: Only GET and POST allowed");
  }
  result.method = method;

  // Check mandatory URL
  if (!parts[1].startsWith("URL ")) {
    throw new Error("Second part must be 'URL [value]'");
  }
  result.url = parts[1].split(" ")[1];

  // Process optional parts
  for (let i = 2; i < parts.length; i++) {
    const [keyword, value] = parts[i].split(" ", 2);
    const jsonPart = parts[i].substring(keyword.length + 1); // full json after space

    if (!isValidJson(jsonPart)) {
      throw new Error(`Invalid JSON for ${keyword}`);
    }

    const parsedValue = JSON.parse(jsonPart);

    switch (keyword) {
      case "HEADERS":
        result.headers = parsedValue;
        break;
      case "QUERY":
        result.query = parsedValue;
        break;
      case "BODY":
        result.body = parsedValue;
        break;
      default:
        throw new Error(`Unknown keyword: ${keyword}`);
    }
  }

  // Build full URL if query exists
  if (Object.keys(result.query).length > 0) {
    const queryParams = new URLSearchParams(result.query).toString();
    result.url += "?" + queryParams;
  }

  return result;
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
