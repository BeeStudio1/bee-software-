$root = "bee/app/renderer"

Write-Host "==> Réparation Bee Panel..." -ForegroundColor Cyan

# --- i18n ---
$i18n = "$root/i18n"
if (-not (Test-Path $i18n)) { New-Item -ItemType Directory -Path $i18n | Out-Null }

@"
{
  "title": "Bee Panel",
  "subtitle": "Gestion du bot Discord et de l’interface.",
  "languageLabel": "Langue",
  "themeLabel": "Thème"
}
"@ | Set-Content "$i18n/fr.json" -Encoding UTF8

@"
{
  "title": "Bee Panel",
  "subtitle": "Manage your Discord bot and interface.",
  "languageLabel": "Language",
  "themeLabel": "Theme"
}
"@ | Set-Content "$i18n/en.json" -Encoding UTF8

@"
{
  "title": "Bee Panel",
  "subtitle": "Zarządzanie botem Discord i interfejsem.",
  "languageLabel": "Język",
  "themeLabel": "Motyw"
}
"@ | Set-Content "$i18n/pl.json" -Encoding UTF8

@"
{
  "title": "Bee Panel",
  "subtitle": "Quản lý bot Discord và giao diện.",
  "languageLabel": "Ngôn ngữ",
  "themeLabel": "Chủ đề"
}
"@ | Set-Content "$i18n/vi.json" -Encoding UTF8

# --- renderer.js ---
@"
PASTE_RENDERER_JS_HERE
"@ | Set-Content "$root/renderer.js" -Encoding UTF8

Write-Host "==> Réparation terminée !" -ForegroundColor Green