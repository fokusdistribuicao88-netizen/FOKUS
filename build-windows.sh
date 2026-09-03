#!/bin/bash

# Script de Setup e Build para FOKUS Windows App
# Este script automatiza o processo de instalação e geração do .exe

echo "🚀 =========================================="
echo "   FOKUS - Gerador de Instalador Windows"
echo "=========================================="
echo ""

# Verificar se Node.js está instalado
echo "📋 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "📥 Baixe em: https://nodejs.org (versão LTS)"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Verificar se .env.local existe
echo "🔐 Verificando configuração..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local não encontrado!"
    echo "📝 Criando a partir do template..."
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado!"
    echo ""
    echo "⚠️  IMPORTANTE: Edite .env.local com suas credenciais Base44:"
    echo "   VITE_BASE44_APP_ID=seu_id"
    echo "   VITE_BASE44_APP_BASE_URL=seu_url"
    echo ""
    read -p "Pressione Enter após editar o arquivo .env.local..."
fi

echo "✅ Configuração encontrada"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
echo "   (isto pode levar alguns minutos na primeira vez...)"
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências!"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso"
echo ""

# Fazer build
echo "🔨 Construindo aplicativo Windows..."
echo "   (isto pode levar 2-5 minutos...)"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro ao fazer build!"
    exit 1
fi

echo ""
echo "✅ =========================================="
echo "   BUILD COMPLETO!"
echo "=========================================="
echo ""
echo "📦 Seus instaladores estão em:"
echo "   dist-electron/"
echo ""
echo "📄 Arquivos gerados:"
ls -lh dist-electron/*.exe 2>/dev/null | awk '{print "   - " $9 " (" $5 ")"}'
echo ""
echo "📝 Como usar:"
echo "   1. Copie FOKUS-0.0.0.exe para usuários"
echo "   2. Eles executam e instalam"
echo "   3. App fica disponível no Menu Iniciar"
echo ""
echo "🎉 Pronto para distribuir!"
