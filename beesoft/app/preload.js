const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('beeAPI', {
  startBot: () => ipcRenderer.send('bot-start'),
  stopBot: () => ipcRenderer.send('bot-stop'),
  onBotStatus: (cb) => ipcRenderer.on('bot-status', (_, s) => cb(s)),
  onBotLog: (cb) => ipcRenderer.on('bot-log', (_, l) => cb(l)),

  getMusicFiles: () => ipcRenderer.invoke('get-music-files'),

  detachTab: (tab) => ipcRenderer.send('detach-tab', tab),

  proxyAudio: (url) => ipcRenderer.invoke('proxy-audio', url),

  // 🔥 AUTO‑THEMES
  getThemes: () => ipcRenderer.invoke('get-themes'),

  // 🔥 AUTO‑LANGUES
  getLanguages: () => ipcRenderer.invoke('get-languages'),

  // 🔥 PERFORMANCES
  getPerformance: () => ipcRenderer.invoke('get-performance')
});