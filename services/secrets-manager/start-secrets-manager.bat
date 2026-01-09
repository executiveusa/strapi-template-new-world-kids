@echo off
REM Secrets Manager - Startup Script
REM Run this to start the secrets manager on boot

cd /d "c:\Users\Trevor\OneDrive\One Drive Total Dump\Srpski\NEW WORLD KIDS 11.23.2025\strapi-template-new-world-kids\services\secrets-manager"

echo Starting Secrets Manager MCP Server...
node dist\index.js

pause
