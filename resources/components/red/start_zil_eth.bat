:: These environment variables should be set to for the driver to allow max mem allocation from the gpu(s).
set GPU_MAX_ALLOC_PERCENT=100
set GPU_SINGLE_ALLOC_PERCENT=100
set GPU_MAX_HEAP_SIZE=100
set GPU_USE_SYNC_OBJECTS=1

:: This example file sets up ETH+ZIL mining using the new mechanism introduced in TRM v0.8.3. The ZIL
:: configuration is added between the --zil and --zil_end arguments. See the DUAL_ZIL_MINING.txt guide
:: for more info
::
:: Please change the wallets below to your own before mining.

teamredminer.exe -a ethash -o stratum+tcp://eu1.ethermine.org:4444 -u 0x02197021fefa795fec661a45f60e47a6f6605281.trmtest -p x --zil -o stratum+tcp://eu.ezil.me:5555 -u 0x02101Ff031529661dcAb36614d0Fa5a76e4721B4.zil14fw7uxmrjrlsxdfsjp6razax6ysk2eerc7uryy.trmtest_zil -p x --zil_end

