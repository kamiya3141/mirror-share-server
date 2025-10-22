@echo off

curl -L -o ./cloudflared.exe https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe

start "" /B ./cloudflared.exe access rdp --hostname rdp-dh1.tshuto.com --url localhost:3330 > NUL 2>&1

mstsc /v:localhost:3330
