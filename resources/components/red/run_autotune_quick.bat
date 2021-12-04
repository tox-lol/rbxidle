@echo off

:: This is a helper script for the TRM auto-tune process. This script runs the
:: same process as the miner does everytime you start it, but will log all output
:: to a file and exit as soon as the auto-tuning process has completed. Please 
:: make sure you've read the CN_AUTOTUNING_WITH_TRM.txt guide before running
:: this script.

:: Choose algo here unless cn/r is your target. Only CN algos supported. Run
:: help.bat to list available CN variants.
set ALGO=cnr

:: Insert your pool below. Change 'tcp' to 'ssl' if you run a SSL stratum
:: connection. 
set POOL=stratum+tcp://pool.supportxmr.com:7777

:: Your wallet. This is the TRM donation/test wallet. PLEASE do replace it
:: with your own wallet, this is only to make sure the most lazy of users can
:: test this script with zero time invested.
set WALLET=479c6JsyawEVAMNZU8GMmXgVPTxd1vdejR6vVpsm7z8y2AvP7C5hz2g5gfrqyffpvLPLYb2eUmmWA5yhRw5ANYyePX7SvLE

:: Pool password, very rarely used.
set PASSWORD=x

:: Auto-Tune parameters

:: Subset of devices if you only want to test on a few. Enter e.g. -d 0,1,3 to 
:: only run the first, second and fourth device.
::set DEVS=-d 0,1,3
set DEVS=

:: Flip the comment between these two lines if you want to use bus order of
:: your gpus to match e.g. the OverdriveNTool order.
::set BUS_ORDER=--bus_reorder
set BUS_ORDER=

:: The mode can be QUICK or SCAN. See the tuning guide for more info.
set MODE=QUICK

:: Old legacy GPU environment variables
set GPU_MAX_HEAP_SIZE=100
set GPU_USE_SYNC_OBJECTS=1
set GPU_MAX_ALLOC_PERCENT=100
set GPU_SINGLE_ALLOC_PERCENT=100

@echo on
teamredminer.exe -a %ALGO% --log_file=autotune_quick_log.txt -o %POOL% -u %WALLET% -p %PASSWORD% --auto_tune=%MODE% --auto_tune_exit %BUS_ORDER% %DEVS% 

@echo off
pause
