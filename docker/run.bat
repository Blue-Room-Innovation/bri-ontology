@echo off
REM Run npm command inside Docker container

cd /d "%~dp0\.."

if "%~1"=="" (
    echo Usage: %~nx0 ^<npm-script-name^> [args...]
    echo.
    echo Examples:
    echo   %~nx0 config:show
    echo   %~nx0 validate:owl:with-codelists
    echo   %~nx0 generate:types
    echo   %~nx0 build:all
    exit /b 1
)

echo 🐳 Running: npm run %*
docker run --rm -v "%cd%:/workspace" -w /workspace bri-ontology-tooling:latest npm run %*
