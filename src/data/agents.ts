import type { Agent, Task } from '../types';

export const agents: Agent[] = [
  {
    id: 'trading',
    name: 'William-Trading',
    emoji: '🎲',
    role: 'Trading & Finance',
    status: 'active',
    currentTask: 'Monitoring Polymarket positions',
    lastActivity: '2026-02-18T16:20:00Z',
    sessionKey: 'agent:main:subagent:6dff4b3b-26d2-4630-ab72-e728e9ecc06c'
  },
  {
    id: 'dev',
    name: 'William-Dev',
    emoji: '💻',
    role: 'Web Development',
    status: 'active',
    currentTask: 'Building Agent Dashboard',
    lastActivity: '2026-02-18T16:25:00Z',
    sessionKey: 'agent:main:subagent:ec973a10-e5ed-4815-a855-225ed70c2009'
  },
  {
    id: 'data',
    name: 'William-Data',
    emoji: '📊',
    role: 'Data & Research',
    status: 'active',
    currentTask: null,
    lastActivity: '2026-02-18T14:15:00Z',
    sessionKey: 'agent:main:subagent:288e57c3-8e7c-43cb-a4a6-0bb9bae22da9'
  },
  {
    id: 'docs',
    name: 'William-Docs',
    emoji: '📝',
    role: 'Documentation',
    status: 'paused',
    currentTask: null,
    lastActivity: '2026-02-18T10:30:00Z'
  }
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    agentId: 'dev',
    agentName: 'William-Dev',
    agentEmoji: '💻',
    description: 'Create Agent Status Dashboard',
    status: 'in-progress',
    timestamp: '2026-02-18T16:25:00Z',
    priority: 'high'
  },
  {
    id: 'task-2',
    agentId: 'trading',
    agentName: 'William-Trading',
    agentEmoji: '🎲',
    description: 'Analyze portfolio performance Q1',
    status: 'completed',
    timestamp: '2026-02-18T12:00:00Z',
    priority: 'medium'
  },
  {
    id: 'task-3',
    agentId: 'data',
    agentName: 'William-Data',
    agentEmoji: '📊',
    description: 'Scrape market data for analysis',
    status: 'pending',
    timestamp: '2026-02-18T16:00:00Z',
    priority: 'medium'
  },
  {
    id: 'task-4',
    agentId: 'trading',
    agentName: 'William-Trading',
    agentEmoji: '🎲',
    description: 'Polymarket paper trading simulation',
    status: 'in-progress',
    timestamp: '2026-02-18T15:30:00Z',
    priority: 'high'
  },
  {
    id: 'task-5',
    agentId: 'docs',
    agentName: 'William-Docs',
    agentEmoji: '📝',
    description: 'Update AGENTS.md documentation',
    status: 'pending',
    timestamp: '2026-02-18T10:00:00Z',
    priority: 'low'
  }
];

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  return `Il y a ${diffDays}j`;
}

export function getStatusColor(status: AgentStatus): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'paused': return 'bg-yellow-500';
    case 'inactive': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

export function getStatusLabel(status: AgentStatus): string {
  switch (status) {
    case 'active': return '🟢 Actif';
    case 'paused': return '🟡 En pause';
    case 'inactive': return '🔴 Inactif';
    default: return '⚪ Inconnu';
  }
}

export function getTaskStatusColor(status: Task['status']): string {
  switch (status) {
    case 'in-progress': return 'bg-blue-500 text-blue-100';
    case 'completed': return 'bg-green-500 text-green-100';
    case 'pending': return 'bg-gray-500 text-gray-100';
    default: return 'bg-gray-500 text-gray-100';
  }
}

export function getTaskStatusLabel(status: Task['status']): string {
  switch (status) {
    case 'in-progress': return 'En cours';
    case 'completed': return 'Terminé';
    case 'pending': return 'En attente';
    default: return 'Inconnu';
  }
}

export function getPriorityColor(priority: Task['priority']): string {
  switch (priority) {
    case 'high': return 'text-red-400 border-red-400';
    case 'medium': return 'text-yellow-400 border-yellow-400';
    case 'low': return 'text-green-400 border-green-400';
    default: return 'text-gray-400 border-gray-400';
  }
}
