module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const ragas = {
    "Yaman": { rasa: "Shringara", samay: "Night", therapeutic: "Romantic elevation" },
    "Bhairav": { rasa: "Shanti", samay: "Dawn", therapeutic: "Anxiety relief" },
    "Shivaranjani": { rasa: "Karuna", samay: "Night", therapeutic: "Grief release" },
    "Malkauns": { rasa: "Shanti", samay: "Late Night", therapeutic: "Deep meditation" },
    "Todi": { rasa: "Karuna", samay: "Morning", therapeutic: "Trauma processing" },
    "Bhoopali": { rasa: "Bhakti", samay: "Evening", therapeutic: "Devotion" },
    "Khamaj": { rasa: "Hasya", samay: "Evening", therapeutic: "Joy" },
    "Darbari": { rasa: "Veera", samay: "Late Night", therapeutic: "Courage" }
  };
  
  const url = req.url;
  
  if (url === '/api/health') {
    return res.status(200).json({ status: 'ok', version: '3.0.0', ragas: Object.keys(ragas).length });
  }
  
  if (url === '/api/ragas') {
    const list = Object.entries(ragas).map(([name, d]) => ({ name, rasa: d.rasa, samay: d.samay, therapeutic: d.therapeutic }));
    return res.status(200).json(list);
  }
  
  if (url.startsWith('/api/raga/')) {
    const name = url.split('/api/raga/')[1];
    if (ragas[name]) return res.status(200).json({ name, ...ragas[name] });
    return res.status(404).json({ error: 'Not found' });
  }
  
  return res.status(200).json({ message: 'Aigaane V3 API', endpoints: ['/api/health', '/api/ragas', '/api/raga/{name}'] });
};
