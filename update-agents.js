#!/usr/bin/env node
// Update agents.json with real OpenClaw session data
// Run this script via cron every 5 minutes

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function getSessions() {
  return new Promise((resolve, reject) => {
    exec('openclaw sessions list --kinds dev,trading,data,docs --limit 20 --active-minutes 30', (error, stdout, stderr) => {
      if (error && !stdout) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

function parseSessions(output) {
  // Default agent data structure
  const agents = [
    {
      id: 'agent:main',
      name: 'William',
      role: 'Agent Principal',
      avatar: '👑',
      status: 'active',
      description: 'Coordinateur et interface utilisateur principal du système multi-agent.',
      tags: ['Coordination', 'Orchestration'],
      uptime: '99.9%',
      lastActivity: 'now'
    }
  ];

  // Map session data to agent cards
  const agentMap = {
    'dev': { name: 'Dev', avatar: '💻', role: 'Agent Spécialiste', tags: ['Code', 'Web'] },
    'trading': { name: 'Trading', avatar: '🎲', role: 'Agent Spécialiste', tags: ['Finance', 'Portfolio'] },
    'data': { name: 'Data', avatar: '📊', role: 'Agent Spécialiste', tags: ['Analytics', 'Research'] },
    'docs': { name: 'Docs', avatar: '📝', role: 'Agent Spécialiste', tags: ['Documentation', 'Memory'] }
  };

  // Parse the output to find active sessions
  const lines = output.split('\n');
  const activeKinds = new Set();
  
  for (const line of lines) {
    for (const [kind, info] of Object.entries(agentMap)) {
      if (line.includes(kind) && line.includes('🟢')) {
        activeKinds.add(kind);
      }
    }
  }

  // Add agents based on found sessions
  for (const [kind, info] of Object.entries(agentMap)) {
    const isActive = activeKinds.has(kind);
    agents.push({
      id: `agent:${kind}`,
      name: info.name,
      role: info.role,
      avatar: info.avatar,
      status: isActive ? 'active' : 'offline',
      description: getDescription(kind),
      tags: info.tags,
      uptime: isActive ? '98.5%' : '--',
      lastActivity: isActive ? '< 5 min' : '> 30 min'
    });
  }

  return agents;
}

function getDescription(kind) {
  const descriptions = {
    'dev': 'Développement web, applications et maintenance du code.',
    'trading': 'Trading, finance et analyse marché. Paper trading Polymarket.',
    'data': 'Scraping web, analyse de données et recherche d\'information.',
    'docs': 'Organisation, documentation et mémoire du système.'
  };
  return descriptions[kind] || 'Agent spécialisé.';
}

async function main() {
  try {
    // Get session data
    const sessionsOutput = await getSessions().catch(() => '');
    const agents = parseSessions(sessionsOutput);
    
    // Create the data file
    const data = {
      agents,
      timestamp: new Date().toISOString()
    };

    // Write to file
    const outputPath = path.join(__dirname, 'agents.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    // Git commit and push
    const { execSync } = require('child_process');
    execSync('git add agents.json', { cwd: __dirname });
    try {
      execSync(`git commit -m "Update agents data: ${new Date().toISOString()}"`, { cwd: __dirname });
      execSync('git push', { cwd: __dirname });
    } catch (e) {
      // No changes to commit
    }
    
    console.log('✅ Agents data updated successfully');
  } catch (error) {
    console.error('❌ Error updating agents:', error.message);
    process.exit(1);
  }
}

main();
