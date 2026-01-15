@echo off
REM Configuration display script - uses venv Python

if exist .venv\Scripts\python.exe (
    .venv\Scripts\python.exe scripts\show-config.py
) else (
    python scripts\show-config.py
)
