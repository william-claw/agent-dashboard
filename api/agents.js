// Vercel Edge Function - Real-time Agent Status API
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  });

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    // Static agent info - in a real implementation you'd query OpenClaw API
    const agents = [
      {
        id: 'agent:main',
        name: 'William',
        role: 'Agent Principal',
        avatar: '👑',
        status: 'active',
        description: 'Coordinateur et interface utilisateur principal',
        tags: ['Coordination', 'Orchestration'],
        uptime: '99.9%',
      },
      {
        id: 'agent:trading',
        name: 'Trading',
        role: 'Agent Spécialiste',
        avatar: '🎲',
        status: 'active',
        description: 'Trading, finance et analyse marché',
        tags: ['Finance', 'Portfolio'],
        uptime: '98.2%',
      },
      {
        id: 'agent:dev',
        name: 'Dev',
        role: 'Agent Spécialiste',
        avatar: '💻',
        status: 'busy',
        description: 'Développement web et applications',
        tags: ['Code', 'Web'],
        uptime: '94.5%',
      },
      {
        id: 'agent:data',
        name: 'Data',
        role: 'Agent Spécialiste',
        avatar: '📊',
        status: 'active',
        description: 'Scraping web et analyse de données',
        tags: ['Analytics', 'Research'],
        uptime: '99.1%',
      },
    ];

    return new Response(JSON.stringify({ agents, timestamp: new Date().toISOString() }), { headers, status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers, status: 500 });
  }
}
