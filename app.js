// Agent Dashboard - JavaScript

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short'
    };
    document.getElementById('last-updated').textContent = now.toLocaleString('en-US', options);
}

// Update timestamp on load and every second
updateTimestamp();
setInterval(updateTimestamp, 1000);

// Simulate status updates
const statuses = ['active', 'warning', 'offline'];

function simulateStatusChanges() {
    const cards = document.querySelectorAll('.agent-card');
    
    cards.forEach((card, index) => {
        // Skip first card (keep it active)
        if (index === 0) return;
        
        const indicator = card.querySelector('.status-indicator');
        const badge = card.querySelector('.status-badge');
        
        // Randomly change status occasionally
        if (Math.random() < 0.02) {
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Remove all status classes
            indicator.classList.remove('active', 'warning', 'offline');
            badge.classList.remove('active', 'warning', 'offline');
            
            // Add new status
            indicator.classList.add(newStatus);
            badge.classList.add(newStatus);
            
            // Update badge text
            badge.textContent = `● ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`;
            
            // Update uptime text
            const uptime = card.querySelector('.uptime');
            if (newStatus === 'active') {
                uptime.textContent = '99.9% uptime';
            } else if (newStatus === 'warning') {
                uptime.textContent = 'High Load';
            } else {
                uptime.textContent = '--';
            }
        }
    });
}

// Run simulation every 5 seconds
setInterval(simulateStatusChanges, 5000);

// Console message
console.log('🤖 Agent Dashboard loaded');
console.log('4 agents online');
