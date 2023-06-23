@echo off
set /P reset= "Do you need to update the registered commands(y || n): "

if %reset%==y (
	node src/deploy-commands.js
)

if NOT %errorlevel%==0 (
	echo "[ERROR] please fix the deploy-commands.js script"
) else (
	node src/index.js
)
