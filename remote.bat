@echo off
cd adb
adb tcpip 3890
adb connect 192.168.1.95:3890
exit
