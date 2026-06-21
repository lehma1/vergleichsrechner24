#!/bin/bash
# Comparison24 - Linux Deployment Script
# This script installs Docker and starts your portal.

echo "🚀 Starting Comparison24 Linux Setup..."

# Update system
sudo apt-get update

# Install Docker if not present
if ! [ -x "$(command -v docker)" ]; then
  echo "📦 Installing Docker..."
  sudo apt-get install -y docker.io
fi

# Install Docker Compose if not present
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "📦 Installing Docker Compose..."
  sudo apt-get install -y docker-compose
fi

# Start the application
echo "⚡ Building and starting the portal..."
sudo docker-compose up -d --build

echo "✅ Comparison24 is now running on your Linux server!"
echo "🔗 Access it at: http://localhost:3000 (or your Domain/IP)"
