const getAddressFromCoordinates = async (req, res) => {
  const { lat, lon } = req.body;
  const accessKey = "dd59dc3fdaac1aefb304012c1e1d4dc6"; // Your Positionstack API key

  if (!lat || !lon) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  const url = `http://api.positionstack.com/v1/reverse?access_key=${accessKey}&query=${lat},${lon}&limit=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.data?.length > 0) {
      const address = data.data[0].label; // Full formatted address
      console.log("Full Address:", address);
      return res.json({ address });
    } else {
      return res.status(404).json({ message: "No address found" });
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAddressFromCoordinates };
