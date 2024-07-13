@echo off
echo in order for this to work, you need to do this https://github.com/Dambo389/phone/tree/main when you have done this, connect the phone by wire
:m1
Echo 1 - reboot phone
Set /p choice="d: "
if not defined choice goto m1'
if "%choice%"=="1" (cd adb
adb reboot)
goto m1
pause