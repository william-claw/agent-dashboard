import type { Agent, Task } from '../types';

export const agents: Agent[] = [
  {
    id: 'trading',
    name: 'William-Trading',
    emoji: '🎲',
    specialty: 'Trading, finance, analyse marché',
    status: 'active',
    color: 'emerald'
  },
  {
    id: 'dev',
    name: 'William-Dev',
    emoji: '💻',
    specialty: 'Développement web, apps, coding',
    status: 'active',
    color: 'blue'
  },
  {
    id: 'data',
    name: 'William-Data',
    emoji: '📊',
    specialty: 'Scraping, analyse données, recherche',
    status: 'active',
    color: 'purple'
  },
  {
    id: 'docs',
    name: 'William-Docs',
    emoji: '📝',
    specialty: 'Organisation, documentation, mémoire',
    status: 'idle',
    color: 'amber'
  }
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    agentId: 'dev',
    description: 'Create Agent Status Dashboard',
    status: 'in_progress',
    createdAt: '2026-02-18T16:25:00Z'
  },
  {
    id: 'task-2',
    agentId: 'trading',
    description: 'Analyze portfolio performance Q1',
    status: 'completed',
    createdAt: '2026-02-18T12:00:00Z',
    updatedAt: '2026-02-18T14:00:00Z'
  },
  {
    id: 'task-3',
    agentId: 'data',
    description: 'Scrape market data for analysis',
    status: 'pending',
    createdAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'task-4',
    agentId: 'trading',
    description: 'Polymarket paper trading simulation',
    status: 'in_progress',
    createdAt: '2026-02-18T15:30:00Z'
  },
  {
    id: 'task-5',
    agentId: 'docs',
    description: 'Update AGENTS.md documentation',
    status: 'pending',
    createdAt: '2026-02-18T10:00:00Z'
  }
];

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function getStatusColor(status: Agent['status']): string {
  switch (status) {
    case 'active':
      return 'bg-emerald-500';
    case 'busy':
      return 'bg-amber-500';
    case 'idle':
      return 'bg-slate-400';
    case 'offline':
      return 'bg-red-500';
    default:
      return 'bg-slate-400';
  }
}

export function getStatusLabel(status: Agent['status']): string {
  switch (status) {
    case 'active':
      return '🟢 Active';
    case 'busy':
      return '🔴 Busy';
    case 'idle':
      return '🟡 Standby';
    case 'offline':
      return '⚪ Offline';
    default:
      return '⚪ Unknown';
  }
}

export function getTaskStatusColor(status: Task['status']): string {
  switch (status) {
    case 'in_progress':
      return 'bg-blue-500 text-blue-100';
    case 'completed':
      return 'bg-emerald-500 text-emerald-100';
    case 'failed':
      return 'bg-red-500 text-red-100';
    case 'pending':
      return 'bg-slate-500 text-slate-100';
    default:
      return 'bg-slate-500 text-slate-100';
  }
}

export function getTaskStatusLabel(status: Task['status']): string {
  switch (status) {
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'failed':
      return 'Failed';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
}
