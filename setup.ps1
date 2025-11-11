#!/usr/bin/env powershell
# AnxietyFlow - Setup Checklist & Run Script
# Run this to get started with the app

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🧘 AnxietyFlow - Setup Checklist" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check 1: Node.js installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js v14+." -ForegroundColor Red
    exit 1
}

# Check 2: npm installed
$npmVersion = npm --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found." -ForegroundColor Red
    exit 1
}

# Check 3: Project files exist
Write-Host ""
Write-Host "📋 Checking project files..." -ForegroundColor Yellow

$requiredFiles = @(
    "package.json",
    "index.js",
    "migrate.js",
    "models/db.js",
    "models/userModel.js",
    "controllers/authController.js",
    "controllers/anxietyController.js",
    "routes/index.js",
    "views/home.xian",
    "views/dashboard.xian",
    "views/breathing-exercise.xian",
    "views/game.xian"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - MISSING!" -ForegroundColor Red
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Some files are missing! Please check installation." -ForegroundColor Red
    exit 1
}

# Check 4: Dependencies installed
Write-Host ""
Write-Host "📋 Checking dependencies..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "✅ node_modules exists" -ForegroundColor Green
    Write-Host "✅ Dependencies appear to be installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules not found. Running npm install..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ npm install failed!" -ForegroundColor Red
        exit 1
    }
}

# Check 5: MySQL
Write-Host ""
Write-Host "📋 Checking MySQL..." -ForegroundColor Yellow
Write-Host "ℹ️  Make sure MySQL is running on localhost:3306" -ForegroundColor Cyan
Write-Host "ℹ️  If MySQL is not running, start it before continuing" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Is MySQL running? (Y/N)"
if ($response -ne "Y" -and $response -ne "y") {
    Write-Host "❌ Please start MySQL and try again." -ForegroundColor Red
    exit 1
}

# Setup complete
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ All Checks Passed!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Database migration
Write-Host "📋 Setting up database..." -ForegroundColor Yellow
Write-Host "Running: npm run migrate" -ForegroundColor Cyan
Write-Host ""

npm run migrate

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Migration failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Start the app
Write-Host "🚀 Starting AnxietyFlow..." -ForegroundColor Yellow
Write-Host ""
Write-Host "The app will start on: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start
