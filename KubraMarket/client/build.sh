#!/bin/bash

echo "📦 Installing client dependencies..."
cd client
npm install

echo "🔨 Building Vite frontend..."
npm run build

echo "📁 Moving frontend build to server/public..."
rm -rf ../server/public
cp -r dist ../server/public

echo "📦 Installing server dependencies..."
cd ../server
npm install

echo "✅ Build finished successfully"
