// pages/api/proxyDrawData.js

export default async function handler(req, res) {
    const { fileUrl } = req.query;

  if (!fileUrl) {
    return res.status(400).json({ error: 'File URL is required' });
  }
    try {
      const response = await fetch(fileUrl);
  
      if (!response.ok) {
        res.status(response.status).json({ error: 'Failed to fetch file' });
        return;
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching the file' });
    }
  }
  