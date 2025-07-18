#!/bin/bash

# Aurora Airways - Startup Script
# This script starts the Aurora Airways flight booking website

echo "🛫 Starting Aurora Airways Flight Booking System..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🚀 Starting Aurora Airways server..."
echo "📍 Server will be available at: http://localhost:3000"
echo "🔗 API endpoints available at: http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the application
npm start