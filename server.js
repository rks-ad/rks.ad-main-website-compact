const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

let count = 12487;
if (fs.existsSync(COUNTER_FILE)) {
    count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 12487;
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Route
app.get('/api/counter', (req, res) => {
    const increments = [44, 56, 67, 89, 102, 156, 203, 312, 87, 134];
    count += increments[Math.floor(Math.random() * increments.length)];
    fs.writeFileSync(COUNTER_FILE, count.toString());
    res.json({ count });
});

// Important: Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`RKS.Ad running on port ${PORT}`);
});
