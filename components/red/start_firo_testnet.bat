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
:: NOTE 1: this script is ONLY FOR TESTING firopow before the fork on Tue Oct 26 2021 06:00:00 GMT+0000. This script
::         will never result in real coins being mined.
::
:: NOTE 2: for a more realistic testing scenario, add the argument --prog_height=418000. This will switch to a 4GB DAG,
::         which is what Firo will run at the fork.
::
:: Example:
teamredminer.exe -a firopow -o stratum+tcp://testnet.mintpond.com:3000 -u TUuKypsbbnHHmZ2auC2BBWfaP1oTEnxjK2 -p x
