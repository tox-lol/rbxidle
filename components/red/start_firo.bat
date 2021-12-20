:: Example batch file for starting teamredminer.  Please fill in all <fields> with the correct values for you.
:: Format for running miner:
::      teamredminer.exe -a <algo> -o stratum+tcp://<pool address>:<pool port> -u <pool username/wallet> -p <pool password>
::
:: Fields:
::      algo - the name of the algorithm to run. E.g. mtp, lyra2rev3, phi2
::      pool address - the host name of the pool stratum or it's IP address. E.g. firo.mintpond.com
::      pool port - the port of the pool's stratum to connect to.  E.g. 3000
::      pool username/wallet - For most pools, this is the wallet address you want to mine to.  Some pools require a username
::      pool password - For most pools this can be empty.  For pools using usernames, you may need to provide a password as configured on the pool.
::
::
:: NOTE: Firo will fork to firopow on Tue Oct 26 2021 06:00:00 GMT+0000. Before then this script will choose
::       to mine with mtp, then shutdown the miner for a restart at the time of the fork. When it's restarted
::       it will mine using firopow. Therefore, this script can't be used to test firopow in advance. For that,
::       use the start_firo_testnet.bat script instead.
::
:: Example:
teamredminer.exe -a mtp_firopow -o stratum+tcp://firo.mintpond.com:3000 -u aPZL3WsQ1MAV4Ff16J4oEvCwzCpnzsn9j9 -p x
