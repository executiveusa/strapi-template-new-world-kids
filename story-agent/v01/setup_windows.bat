@echo off
REM =========================================================================
REM  New World Kids Story System — Windows Setup Script (Phase 01)
REM  Creates story-system runtime on E: under NEW WORLD KIDS 2026
REM  All generated data stays on E: to keep C: free
REM =========================================================================

SET ROOT=E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\story-system
SET REPO_AGENT=%~dp0

echo Creating NWK Story System directory tree under %ROOT% ...

mkdir "%ROOT%\StoryToolkitAI" 2>nul
mkdir "%ROOT%\bridge" 2>nul
mkdir "%ROOT%\story-memory" 2>nul
mkdir "%ROOT%\transcripts" 2>nul
mkdir "%ROOT%\indexes" 2>nul
mkdir "%ROOT%\thumbnails" 2>nul
mkdir "%ROOT%\proxies" 2>nul
mkdir "%ROOT%\temp" 2>nul
mkdir "%ROOT%\exports" 2>nul
mkdir "%ROOT%\config" 2>nul
mkdir "%ROOT%\logs" 2>nul
mkdir "%ROOT%\cache" 2>nul

echo.
echo Copying config templates if missing ...
if not exist "%ROOT%\config\sources.json" (
  copy "%REPO_AGENT%config\sources.template.json" "%ROOT%\config\sources.json"
)
if not exist "%ROOT%\config\storytoolkitai.json" (
  copy "%REPO_AGENT%config\storytoolkitai.template.json" "%ROOT%\config\storytoolkitai.json"
)

echo.
echo NEXT STEPS:
echo   1. Confirm %ROOT%\config\sources.json has the Culture Shock root
echo   2. Confirm %ROOT%\config\storytoolkitai.json engine_path
echo   3. python "%REPO_AGENT%story_agent.py" register
echo   4. python "%REPO_AGENT%story_agent.py" health
echo.
echo Setup complete. Generated data root: %ROOT%
echo Do NOT set NWK_PILOT_MONTH until Phase 02 inventory recommends a month.
