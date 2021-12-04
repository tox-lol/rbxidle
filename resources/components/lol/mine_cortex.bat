@echo off

setlocal enableDelayedExpansion

Rem #################################
Rem ## Begin of user-editable part ##
Rem #################################

set "POOL=ctxc.2miners.com:2222"
set "WALLET=0x10487aaa46daf9a19deccfccaa2c5dc80af4692c.WorkerName"

set "EXTRAPARAMETERS="

Rem #################################
Rem ##  End of user-editable part  ##
Rem #################################


if exist "%CD%\lolMiner.exe" goto infolder
echo "Searching for lolMiner.exe, because is not in this folder.That could take sometime..."
for /f "delims=" %%F in ('dir /b /s "C:\lolMiner.exe" 2^>nul') do set MyVariable=%%F
if exist "%MyVariable%" goto WindowsVer
echo "lolMiner.exe is not found in the system, that could be blocked by Windows Defender or Antivirus "
goto END

:infolder
set MyVariable=%CD%\lolMiner.exe

:WindowsVer
echo "Running lolMiner from %MyVariable%"
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
if "%version%" == "10.0" goto W10
goto OtherW

:W10
"%MyVariable%" --coin CTXC --pool !POOL! --user !WALLET! --watchdog exit !EXTRAPARAMETERS!
if %ERRORLEVEL% == 42 (
	timeout 10
	goto W10
)
goto END

:OtherW
"%MyVariable%" --coin CTXC --pool !POOL! --user !WALLET! --watchdog exit !EXTRAPARAMETERS! --nocolor
if %ERRORLEVEL% == 42 (
	timeout 10
	goto OtherW
)

:END
pause

