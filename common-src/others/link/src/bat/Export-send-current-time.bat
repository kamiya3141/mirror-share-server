@echo off

set home_dir=%USERPROFILE%
set working_dir=%home_dir%/Documents/AutoHotkey
set in_p=%working_dir%/ahkv2/projects/send-current-time
set in_ahk_f=%in_p%/main.ahk
set cch_dir_n=cache_dir
set out_p=%working_dir%/export
set out_f_n=send-current-time
set out_exe_f=%out_p%/%cch_dir_n%/%out_f_n%.exe
set out_zip_f=%out_p%/%cch_dir_n%/%out_f_n%.zip
set icon_f=C:/Users/Public/pict/favicon.ico
set ahk2exe_exe_f=%home_dir%/AppData/Local/Programs/AutoHotkey/Compiler/Ahk2Exe.exe

echo check-var：
echo %in_p%
echo %in_ahk_f%
echo %cch_dir_n%
echo %out_p%
echo %out_f_n%
echo %out_exe_f%
echo %out_zip_f%
echo %icon_f%
echo %ahk2exe_exe_f%

cd %working_dir%

rem  compile : ahk -> exe
%ahk2exe_exe_f% /in %in_ahk_f% /out %out_exe_f% /icon %icon_f%
:: echo Compile-:-ok

rem  compress : project-directry
start powershell -Command "Compress-Archive -Path %in_p% -DestinationPath %out_zip_f% -Force"
:: echo Compress-:-ok

rem  upload : https://share.tshuto.com
set rmt_hostname=dh1ds
set rmt_dir=~/public_html/common-src/others/link/src
set rmt_ahk_zip_dir_path=%remote_dir%/zip/ahkv2
set rmt_ahk_exe_dir_path=%remote_dir%/exe

scp %out_zip_f% %remote_hostname%:%rmt_ahk_zip_dir_path%/%out_f_n%.zip
scp %out_exe_f% %remote_hostname%:%rmt_ahk_exe_dir_path%/%out_f_n%.exe
:: echo Upload-:-ok

:: pause