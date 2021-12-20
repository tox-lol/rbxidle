:: These environment variables should be set to for the driver to allow max mem allocation from the gpu(s).
set GPU_MAX_ALLOC_PERCENT=100
set GPU_SINGLE_ALLOC_PERCENT=100
set GPU_MAX_HEAP_SIZE=100
set GPU_USE_SYNC_OBJECTS=1

:: Example batch file for starting teamredminer.  Please fill in all <fields> with the correct values for you.
:: Format for running miner:
::      teamredminer.exe -a <algo> -o stratum+tcp://<pool address>:<pool port> -u <pool username/wallet> -p <pool password>
::
:: Fields:
::      algo - the name of the algorithm to run. E.g. verthash or phi2.
::      pool address - the host name of the pool stratum or it's IP address. E.g. vtc.suprnova.cc
::      pool port - the port of the pool's stratum to connect to.  E.g. 1777
::      pool username/wallet - For most pools, this is the wallet address you want to mine to.  Some pools require a username
::      pool password - For most pools this can be empty or x.  For pools using usernames, you may need to provide a password as configured on the pool.
::
:: NOTE: verthash needs a data set generated for hashing. With the settings below, this is cached in a file called verthash.dat. If you
::       rather want to generate the data set in-memory for every mining session, remote the last --verthash_file argument. Generating
::       the data set takes 
:: Example:
teamredminer.exe -a verthash -o stratum+tcp://vtc.suprnova.cc:1777 -u VbPQsTCUE9RH4StRsyWTTfURmHgZCcdQuM -p x --verthash_file=verthash.dat
