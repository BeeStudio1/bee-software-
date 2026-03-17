const { beeAPI } = window;

// Langues
let currentLang = 'fr';
const translations = {};

async function loadLanguages() {
    const langs = await beeAPI.getLanguages();
    for (const lang of langs) {
        const response = await fetch(`i18n/${lang}.json`);
        translations[lang] = await response.json();
    }
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLang] || {};
    document.getElementById('title').textContent = t.dashboard || 'Bee Panel';
    // Mettre à jour d'autres éléments si nécessaire
}

// Onglets
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).style.display = 'block';
    });
});

// Bot
document.getElementById('startBot').addEventListener('click', () => beeAPI.startBot());
document.getElementById('stopBot').addEventListener('click', () => beeAPI.stopBot());

beeAPI.onBotStatus(status => {
    document.getElementById('botStatus').textContent = `Status: ${status}`;
});

beeAPI.onBotLog(log => {
    const logs = document.getElementById('botLogs');
    logs.textContent += log + '\n';
    logs.scrollTop = logs.scrollHeight;
});

// Musique
async function loadMusic() {
    const files = await beeAPI.getMusicFiles();
    const list = document.getElementById('musicList');
    list.innerHTML = files.map(f => `<div>${f.name}</div>`).join('');
}

// Performances
async function updatePerformance() {
    const perf = await beeAPI.getPerformance();
    document.getElementById('cpu').textContent = perf.cpu;
    document.getElementById('ramUsed').textContent = perf.ram.used;
    document.getElementById('ramTotal').textContent = perf.ram.total;
    document.getElementById('fps').textContent = perf.fps;
}

// Horloge
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('retroClock').textContent = time;
}

// Humeur
const moods = ['😊 Heureux', '😢 Triste', '😡 En colère', '😴 Fatigué', '🤔 Pensif'];
function updateMood() {
    const mood = moods[Math.floor(Math.random() * moods.length)];
    document.getElementById('mood').textContent = `Humeur: ${mood}`;
}

// Init
loadLanguages();
loadMusic();
updatePerformance();
setInterval(updatePerformance, 5000);
setInterval(updateClock, 1000);
setInterval(updateMood, 10000);