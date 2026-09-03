# Script de Setup e Build para FOKUS Windows App (PowerShell)
# Este script automatiza o processo de instalação e geração do .exe
# 
# Como usar:
# 1. Abra PowerShell como Administrador
# 2. Execute: .\build-windows.ps1

Write-Host "🚀 ==========================================" -ForegroundColor Cyan
Write-Host "   FOKUS - Gerador de Instalador Windows" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Node.js está instalado
Write-Host "📋 Verificando Node.js..." -ForegroundColor Yellow
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "📥 Baixe em: https://nodejs.org (versão LTS)" -ForegroundColor White
    exit 1
}

$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
Write-Host ""

# Verificar se .env.local existe
Write-Host "🔐 Verificando configuração..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Arquivo .env.local não encontrado!" -ForegroundColor Yellow
    Write-Host "📝 Criando a partir do template..." -ForegroundColor White
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Arquivo .env.local criado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANTE: Edite .env.local com suas credenciais Base44:" -ForegroundColor Yellow
    Write-Host "   VITE_BASE44_APP_ID=seu_id" -ForegroundColor White
    Write-Host "   VITE_BASE44_APP_BASE_URL=seu_url" -ForegroundColor White
    Write-Host ""
    Write-Host "   Abrindo .env.local no Notepad..." -ForegroundColor Cyan
    notepad ".env.local"
    Write-Host "   Feche o Notepad quando terminar de editar." -ForegroundColor Cyan
}

Write-Host "✅ Configuração encontrada" -ForegroundColor Green
Write-Host ""

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
Write-Host "   (isto pode levar alguns minutos na primeira vez...)" -ForegroundColor Gray
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependências instaladas com sucesso" -ForegroundColor Green
Write-Host ""

# Fazer build
Write-Host "🔨 Construindo aplicativo Windows..." -ForegroundColor Yellow
Write-Host "   (isto pode levar 2-5 minutos...)" -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ ==========================================" -ForegroundColor Green
Write-Host "   BUILD COMPLETO!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Seus instaladores estão em:" -ForegroundColor Cyan
Write-Host "   dist-electron/" -ForegroundColor White
Write-Host ""

Write-Host "📄 Arquivos gerados:" -ForegroundColor Cyan
Get-ChildItem "dist-electron\*.exe" -ErrorAction SilentlyContinue | ForEach-Object {
    $size = "{0:N2}" -f ($_.Length / 1MB)
    Write-Host "   - $($_.Name) ($size MB)" -ForegroundColor White
}

Write-Host ""
Write-Host "📝 Como usar:" -ForegroundColor Cyan
Write-Host "   1. Abra a pasta: dist-electron/" -ForegroundColor White
Write-Host "   2. Copie FOKUS-0.0.0.exe para usuários" -ForegroundColor White
Write-Host "   3. Eles executam e instalam" -ForegroundColor White
Write-Host "   4. App fica disponível no Menu Iniciar" -ForegroundColor White
Write-Host ""

Write-Host "🎉 Pronto para distribuir!" -ForegroundColor Green
Write-Host ""

# Perguntar se quer abrir a pasta
$response = Read-Host "Deseja abrir a pasta dist-electron agora? (S/n)"
if ($response -eq "S" -or $response -eq "s" -or $response -eq "") {
    Start-Process "explorer.exe" -ArgumentList "dist-electron"
}

Write-Host "✨ Sucesso! Seu app Windows está pronto!" -ForegroundColor Cyan
