@echo off
REM Build Docker image for ontology tooling

cd /d "%~dp0\.."

echo 🐳 Building Docker image: bri-ontology-tooling...
docker build -t bri-ontology-tooling:latest -f docker/Dockerfile .

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed!
    exit /b 1
)

echo ✅ Docker image built successfully!
echo.
echo 📋 Available npm commands:
echo   npm run config:show
echo   npm run validate:owl:with-codelists
echo   npm run generate:types
echo   npm run build:all
echo.
echo 🚀 Run commands with:
echo   docker run --rm -v "%cd%:/workspace" -w /workspace bri-ontology-tooling:latest npm run ^<command^>
