@echo off
REM =========================================================================
REM  New World Kids Story System — Windows Setup Script
REM  Run once on TABLET-RV7J0DA1 to create E:\NWK_STORY_SYSTEM structure
REM  All generated data stays on E: to keep C: free
REM =========================================================================

SET ROOT=E:\NWK_STORY_SYSTEM

echo Creating NWK Story System directory tree under %ROOT% ...

mkdir "%ROOT%\StoryToolkitAI"
mkdir "%ROOT%\story-memory\2023\Q4\10-october\transcripts"
mkdir "%ROOT%\story-memory\2023\Q4\10-october\analysis"
mkdir "%ROOT%\story-memory\2023\Q4\10-october\selections"
mkdir "%ROOT%\transcripts"
mkdir "%ROOT%\indexes"
mkdir "%ROOT%\thumbnails"
mkdir "%ROOT%\proxies"
mkdir "%ROOT%\temp"
mkdir "%ROOT%\exports"
mkdir "%ROOT%\config"
mkdir "%ROOT%\logs"

echo.
echo Copying sources template ...
copy "%~dp0config\sources.template.json" "%ROOT%\config\sources.json"
echo.
echo NEXT STEP:
echo   Open %ROOT%\config\sources.json
echo   Replace FILL_IN with real footage folder paths
echo   Then run: python "%~dp0story_agent.py" register
echo.
echo Setup complete. Generated data root: %ROOT%
pause
