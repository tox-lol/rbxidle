:: These environment variables should be set to for the driver to allow max mem allocation from the gpu(s).
set GPU_MAX_ALLOC_PERCENT=100
set GPU_SINGLE_ALLOC_PERCENT=100
set GPU_MAX_HEAP_SIZE=100
set GPU_USE_SYNC_OBJECTS=1

teamredminer.exe -a ethash -o stratum+tcp://eu1.ethermine.org:4444 -u 0x02197021fefa795fec661a45f60e47a6f6605281.trmtest -p x --enable_compute --uac

