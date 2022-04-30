:: These environment variables should be set to for the driver to allow max mem allocation from the gpu(s).
set GPU_MAX_ALLOC_PERCENT=100
set GPU_SINGLE_ALLOC_PERCENT=100
set GPU_MAX_HEAP_SIZE=100
set GPU_USE_SYNC_OBJECTS=1

:: This example file sets up ETH+TON dual mining using the new mechanism introduced in TRM v0.9.2.
:: The TON configuration is added between the --ton and --ton_end arguments. See the DUAL_ETH_MINING.txt
:: guide for more info.
::
:: PLEASE CHANGE the wallets below to your own before mining unless you're only running quick test.

teamredminer.exe -a ethash -o stratum+tcp://eth.2miners.com:2020 -u 0x02197021fefa795fec661a45f60e47a6f6605281.trmtest -p x --ton -o stratum+tcp://eu1.stratum.ton-pool.com:443/stratum -u EQAvGYu70uOIrkc8mptTgX7MFO3JJOf9cHpe7ZYJqSLXEWwm -p x --ton_end
