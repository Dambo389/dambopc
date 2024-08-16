@echo off
echo in order for this to work, you need to do this https://github.com/Dambo389/phone/tree/main when you have done this, connect the phone by wire
:m1
Echo 1 - reboot phone
Echo 1 - remote access
Set /p choice="d: "
if not defined choice goto m1'
if "%choice%"=="1" (cd adb
adb reboot)
if "%choice%"=="2" (cd adb
adb tcpip 3890)
goto m1
pause
