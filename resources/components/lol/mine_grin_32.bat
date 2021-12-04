@echo off


setlocal enableDelayedExpansion


Rem #################################

Rem ## Begin of user-editable part ##

Rem #################################


set "POOL=asia-grin.2miners.com:3030"
set "WALLET=2aHR0cHM6Ly9ncmluLmJpdG1lc2guY29tL3d1Q3BLeW5kVllZanFQQm1ldHRCNWJjMjE2.WorkerName"

set "PASS=x"

set "EXTRAPARAMETERS="


Rem #################################
Rem ##  End of user-editable part  ##
Rem #################################




set "PARAMS=--profile %PROFILE%"
setx GPU_FORCE_64BIT_PTR 1
setx GPU_MAX_HEAP_SIZE 100
setx GPU_USE_SYNC_OBJECTS 1
setx GPU_MAX_ALLOC_PERCENT 100
setx GPU_SINGLE_ALLOC_PERCENT 100




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
"%MyVariable%"  --coin GRIN-C32 --pool !POOL! --user !WALLET! --pass !PASS!
  --watchdog exit !EXTRAPARAMETERS!
if %ERRORLEVEL% == 42 (
	timeout 10
	goto W10
)
goto END

:OtherW
"%MyVariable%"  --coin GRIN-C32 --pool !POOL! --user !WALLET! --pass !PASS!
 --watchdog exit !EXTRAPARAMETERS! --nocolor
if %ERRORLEVEL% == 42 (
	timeout 10
	goto OtherW
)

:END
pause