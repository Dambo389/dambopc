@Echo off
@echo Hi, choose the right team that you need
:m1
Echo 1 - disable task manager
Echo 2 - enable task manager
Echo 3 - shutdown pc
Echo 4 - control your phone by wire

Set /p choice="d: "
if not defined choice goto m1'
if "%choice%"=="1" (start disabletaskmanager.exe)
if "%choice%"=="2" (start enabletaskmanager.exe)
if "%choice%"=="3" (start shutdownpc.exe)
if "%choice%"=="4" (start phone.bat)
goto m1
pause