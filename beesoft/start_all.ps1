# Lancer le bot en arrière-plan
Start-Process powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File "C:\Users\Lucas\Documents\bee\start_bot.ps1"

# Lancer l'app Electron
Start-Process powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File "C:\Users\Lucas\Documents\bee\start_app.ps1"