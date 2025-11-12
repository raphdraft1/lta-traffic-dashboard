export default async function handler(req, res) {
  try {
    const response = await fetch("https://datamall2.mytransport.sg/ltaodataservice/Traffic-Imagesv2", {
      headers: {
        AccountKey: process.env.LTA_API_KEY,
        accept: "application/json"
      }
    });
    const data = await response.json();

    // Filter only Woodlands/Tuas cameras
    const targetIDs = ["4713", "4703", "2701", "2702"];
    const filtered = data.value.filter(c => targetIDs.includes(c.CameraID));

    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
