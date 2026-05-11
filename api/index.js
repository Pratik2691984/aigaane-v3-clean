module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Raga Database
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
  
  // Health endpoint
  if (url === '/api/health') {
    return res.status(200).json({ 
      status: 'ok', 
      version: '3.0.0',
      ragas_count: Object.keys(ragas).length,
      message: 'Aigaane V3 API is running'
    });
  }
  
  // Get all ragas
  if (url === '/api/ragas') {
    const list = Object.keys(ragas).map(name => ({
      name: name,
      rasa: ragas[name].rasa,
      samay: ragas[name].samay,
      therapeutic: ragas[name].therapeutic
    }));
    return res.status(200).json(list);
  }
  
  // Get single raga
  if (url.startsWith('/api/raga/')) {
    const name = url.split('/api/raga/')[1];
    if (ragas[name]) {
      return res.status(200).json({ name: name, ...ragas[name] });
    }
    return res.status(404).json({ error: 'Raga not found' });
  }
  
  // Root endpoint
  if (url === '/api/') {
    return res.status(200).json({
      message: 'Welcome to Aigaane V3 API',
      endpoints: ['/api/health', '/api/ragas', '/api/raga/{name}']
    });
  }
  
  return res.status(200).json({ 
    message: 'Aigaane V3 API',
    endpoints: ['/api/health', '/api/ragas', '/api/raga/{name}'],
    note: 'Try GET /api/health or GET /api/ragas'
  });
};
