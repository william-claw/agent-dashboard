// William Trading Portal - Real-time Data
const PORTAL_CONFIG = {
  refreshInterval: 5000, // 5 seconds
  apiEndpoint: 'https://api.polymarket.com',
  wsEndpoint: 'wss://ws.polymarket.com'
};

// State
let positions = [];
let trades = [];
let signals = [];
let portfolio = {
  totalValue: 10000.00,
  dailyPnL: 0.00,
  openPositions: 0,
  winRate: 0
};

// Initialize
function init() {
  updateConnectionStatus('connecting');
  loadInitialData();
  startRealtimeUpdates();
  
  // Simulate initial data load
  setTimeout(() => {
    updateConnectionStatus('connected');
    showToast('Portail connecté — Données temps réel');
  }, 1000);
}

// Connection status
function updateConnectionStatus(status) {
  const dot = document.getElementById('ws-status');
  const text = document.getElementById('conn-text');
  
  dot.className = 'status-dot';
  
  switch(status) {
    case 'connected':
      dot.classList.add('connected');
      text.textContent = 'Temps réel';
      break;
    case 'connecting':
      text.textContent = 'Connexion...';
      break;
    case 'error':
      text.textContent = 'Déconnecté';
      break;
  }
}

// Load initial mock data
function loadInitialData() {
  // Simulate some initial data
  addSignal({
    market: 'BTC/USDT',
    signal: 'BUY',
    confidence: 0.85,
    reason: 'Tendance haussière + Sentiment positif Gemini',
    time: new Date()
  });
  
  updatePortfolio();
}

// Real-time updates
function startRealtimeUpdates() {
  // Refresh every 5 seconds
  setInterval(() => {
    updateTimestamp();
    simulateMarketUpdates();
  }, PORTAL_CONFIG.refreshInterval);
  
  updateTimestamp();
}

// Simulate market updates (will be replaced with real data)
function simulateMarketUpdates() {
  // Random small P&L changes
  const change = (Math.random() - 0.5) * 10;
  portfolio.totalValue += change;
  portfolio.dailyPnL += change;
  
  // Randomly add signals
  if (Math.random() < 0.1) { // 10% chance every 5s
    const signals = ['BUY', 'SELL', 'HOLD'];
    const markets = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'POLY/USDC'];
    
    addSignal({
      market: markets[Math.floor(Math.random() * markets.length)],
      signal: signals[Math.floor(Math.random() * signals.length)],
      confidence: 0.6 + Math.random() * 0.35,
      reason: 'Analyse Gemini AI — Pattern technique détecté',
      time: new Date()
    });
  }
  
  updatePortfolio();
}

// Add new signal
function addSignal(signalData) {
  signals.unshift(signalData);
  if (signals.length > 10) signals.pop();
  
  renderSignals();
}

// Render signals
function renderSignals() {
  const container = document.getElementById('signals-container');
  
  if (signals.length === 0) {
    container.innerHTML = '<div class="empty-state">Aucun signal pour le moment</div>';
    return;
  }
  
  container.innerHTML = signals.map(s => `
    <div class="signal-card">
      <div class="signal-header">
        <span class="signal-market">${s.market}</span>
        <span class="signal-badge ${s.signal.toLowerCase()}">${s.signal}</span>
      </div>
      <div class="signal-confidence">Confiance: ${Math.round(s.confidence * 100)}%</div>
      <div class="signal-reason">${s.reason}</div>
      <div class="signal-time">${formatTime(s.time)}</div>
    </div>
  `).join('');
}

// Update portfolio display
function updatePortfolio() {
  document.getElementById('total-value').textContent = `$${portfolio.totalValue.toFixed(2)}`;
  document.getElementById('daily-pnl').textContent = `${portfolio.dailyPnL >= 0 ? '+' : ''}$${portfolio.dailyPnL.toFixed(2)}`;
  document.getElementById('open-positions').textContent = portfolio.openPositions;
  document.getElementById('win-rate').textContent = `${portfolio.winRate}%`;
  
  // Color coding
  const totalChange = document.getElementById('total-change');
  const dailyChange = document.getElementById('daily-change');
  
  const totalChangePct = ((portfolio.totalValue - 10000) / 10000 * 100).toFixed(2);
  totalChange.textContent = `${totalChangePct >= 0 ? '+' : ''}${totalChangePct}%`;
  totalChange.className = 'stat-change ' + (totalChangePct >= 0 ? 'positive' : 'negative');
  
  dailyChange.textContent = `${portfolio.dailyPnL >= 0 ? '+' : ''}${(portfolio.dailyPnL / 100).toFixed(2)}%`;
  dailyChange.className = 'stat-change ' + (portfolio.dailyPnL >= 0 ? 'positive' : 'negative');
}

// Format time
function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'À l\'instant';
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// Update timestamp
function updateTimestamp() {
  document.getElementById('last-update').textContent = 
    `Dernière mise à jour: ${new Date().toLocaleString('fr-FR')}`;
}

// Manual refresh
function refreshData() {
  showToast('Rafraîchissement...');
  simulateMarketUpdates();
  
  // Add a manual signal
  addSignal({
    market: 'BTC/USDT',
    signal: 'HOLD',
    confidence: 0.72,
    reason: 'Marché stable — Attente de confirmation',
    time: new Date()
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Start
init();
