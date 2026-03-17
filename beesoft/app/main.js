const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');

let mainWindow = null;
let botProcess = null;

// =========================
// BOT DISCORD
// =========================
function startBot() {
  if (botProcess) return;

  botProcess = spawn('node', ['../bot/bot.js'], {
    cwd: path.join(__dirname),
    shell: true
  });

  botProcess.stdout.on('data', data => {
    if (mainWindow) mainWindow.webContents.send('bot-log', data.toString());
  });

  botProcess.stderr.on('data', data => {
    if (mainWindow) mainWindow.webContents.send('bot-log', '[ERREUR] ' + data.toString());
  });

  botProcess.on('close', () => {
    if (mainWindow) mainWindow.webContents.send('bot-status', 'stopped');
    botProcess = null;
  });

  if (mainWindow) mainWindow.webContents.send('bot-status', 'running');
}

function stopBot() {
  if (!botProcess) return;
  botProcess.kill();
  botProcess = null;
  if (mainWindow) mainWindow.webContents.send('bot-status', 'stopped');
}

// =========================
// FENÊTRES
// =========================
function createSplash() {
  const splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  splash.loadURL(`data:text/html,<html><body style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:2em;">Bee Studio</body></html>`);

  setTimeout(() => {
    splash.close();
  }, 3000);
}

function createWindow(initialTab = 'dashboard', detached = false) {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  const filePath = path.join(__dirname, 'renderer', 'index.html');
  const url = `file://${filePath}?tab=${initialTab}`;

  win.loadURL(url);

  if (!detached) {
    mainWindow = win;
  }
}

// =========================
// MUSIQUE LOCALE
// =========================
ipcMain.handle('get-music-files', () => {
  const musicPath = path.join(__dirname, '..', 'musique');
  if (!fs.existsSync(musicPath)) return [];

  return fs.readdirSync(musicPath)
    .filter(f => f.endsWith('.mp3') || f.endsWith('.wav'))
    .map(f => ({
      name: f,
      path: path.join(musicPath, f)
    }));
});

// =========================
// PROXY AUDIO (RADIOS)
// =========================
ipcMain.handle('proxy-audio', async (_, url) => {
  return new Promise(resolve => {
    const client = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Referer": "https://www.google.com/",
        "Origin": "https://www.google.com"
      }
    };

    client.get(url, options, res => {
      if (res.statusCode === 200) resolve(url);
      else resolve(null);
    }).on('error', () => resolve(null));
  });
});

// =========================
// DÉTACHER ONGLET
// =========================
ipcMain.on('detach-tab', (_, tabName) => {
  createWindow(tabName, true);
});

// =========================
// AUTO‑DETECTION DES THEMES
// =========================
ipcMain.handle("get-themes", () => {
  const themesPath = path.join(__dirname, "renderer", "themes");
  if (!fs.existsSync(themesPath)) return [];

  return fs.readdirSync(themesPath)
    .filter(f => f.endsWith(".css"))
    .map(f => f.replace(".css", ""));
});

// =========================
// AUTO‑DETECTION DES LANGUES
// =========================
ipcMain.handle("get-languages", () => {
  const langPath = path.join(__dirname, "renderer", "i18n");
  if (!fs.existsSync(langPath)) return [];

  return fs.readdirSync(langPath)
    .filter(f => f.endsWith(".json"))
    .map(f => f.replace(".json", ""));
});

// =========================
// ANALYSEUR DE PERFORMANCES
// =========================
ipcMain.handle("get-performance", () => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  let cpuUsage = 0;
  cpus.forEach(cpu => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    cpuUsage += ((total - idle) / total) * 100;
  });
  cpuUsage /= cpus.length;

  return {
    cpu: Math.round(cpuUsage),
    ram: {
      used: Math.round(usedMem / 1024 / 1024),
      total: Math.round(totalMem / 1024 / 1024)
    },
    fps: 60 // Placeholder, pour jeux il faudrait une intégration spécifique
  };
});

// =========================
// START APP
// =========================
ipcMain.on('bot-start', () => startBot());
ipcMain.on('bot-stop', () => stopBot());

app.whenReady().then(() => {
  createSplash();
  setTimeout(() => createWindow('dashboard', false), 3000);
});