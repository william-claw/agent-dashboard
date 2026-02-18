export interface Agent {
  id: string;
  name: string;
  emoji: string;
  specialty: string;
  status: 'active' | 'busy' | 'idle' | 'offline';
  color: string;
}

export interface Task {
  id: string;
  agentId: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt?: string;
}
