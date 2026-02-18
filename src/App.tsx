import { useState, useEffect } from 'react'
import type { Agent, Task } from './types'

const AGENTS: Agent[] = [
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
]

const MOCK_TASKS: Task[] = [
  { id: '1', agentId: 'dev', description: 'Build dashboard React', status: 'in_progress', createdAt: '2026-02-18T20:00:00Z', updatedAt: '2026-02-18T21:00:00Z' },
  { id: '2', agentId: 'dev', description: 'Setup Vite + Tailwind', status: 'completed', createdAt: '2026-02-18T19:30:00Z', updatedAt: '2026-02-18T20:45:00Z' },
  { id: '3', agentId: 'trading', description: 'Analyze Polymarket trends', status: 'pending', createdAt: '2026-02-18T21:00:00Z' },
  { id: '4', agentId: 'data', description: 'Scraping news daily', status: 'completed', createdAt: '2026-02-18T18:00:00Z', updatedAt: '2026-02-18T19:00:00Z' },
  { id: '5', agentId: 'docs', description: 'Update MEMORY.md', status: 'pending', createdAt: '2026-02-18T20:30:00Z' },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-emerald-500'
    case 'busy': return 'bg-amber-500'
    case 'idle': return 'bg-slate-400'
    case 'offline': return 'bg-red-500'
    default: return 'bg-slate-400'
  }
}

function getTaskStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
    default: return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }
}

function AgentCard({ agent }: { agent: Agent }) {
  const colorClasses: Record<string, string> = {
    emerald: 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10',
    blue: 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10',
    purple: 'border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10',
    amber: 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10',
  }

  return (
    <div className={`border rounded-xl p-4 transition-all duration-300 ${colorClasses[agent.color]} hover:scale-105 cursor-pointer group`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl group-hover:animate-bounce-slow">{agent.emoji}</span>
        <div>
          <h3 className="font-bold text-lg">{agent.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} animate-pulse`}></span>
            <span className="text-xs capitalize text-slate-400">{agent.status}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-400">{agent.specialty}</p>
    </div>
  )
}

function TaskTable({ tasks }: { tasks: Task[] }) {
  const getAgentEmoji = (agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId)
    return agent?.emoji || '🤖'
  }

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/50">
      <div className="p-4 border-b border-slate-700 bg-slate-800/80">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <span className="text-blue-400">📋</span> Tasks en cours
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 text-slate-400 text-sm">
            <tr>
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tasks.map(task => (
              <tr key={task.id} className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="p-3">
                  <span className="text-xl" title={task.agentId}>{getAgentEmoji(task.agentId)}</span>
                </td>
                <td className="p-3">{task.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTaskStatusColor(task.status)}`}>
                    {task.status === 'in_progress' ? 'in progress' : task.status}
                  </span>
                </td>
                <td className="p-3 text-slate-500">
                  {new Date(task.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function App() {
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date())
    }, 30000) // Auto-refresh every 30s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              🤖 Agent Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Multi-Agent Squad Monitor</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Last refresh: {lastRefresh.toLocaleTimeString()}</p>
            <p className="flex items-center gap-1 justify-end">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live
            </p>
          </div>
        </div>
      </header>

      {/* Agent Cards */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-300">Squad Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Tasks Section */}
      <section>
        <TaskTable tasks={MOCK_TASKS} />
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center text-slate-600 text-sm">
        <p>OpenClaw Dashboard v1.0 | Built with React + Vite + Tailwind</p>
      </footer>
    </div>
  )
}

export default App
