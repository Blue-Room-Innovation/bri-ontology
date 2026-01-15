@echo off
REM Wrapper to run Python scripts with venv

if exist .venv\Scripts\python.exe (
    .venv\Scripts\python.exe %*
) else (
    python %*
)
