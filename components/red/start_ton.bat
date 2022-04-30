:: Example bat file for mining TON with teamredminer. PLEASE REPLACE the example wallet and workername below
:: unless you're just doing a quick test.
::
:: Note that TRM doesn't support all TON pools. Please check the most recent version of the TON_MINING.txt
:: guide included in the release package, or read it online here:
::
:: https://github.com/todxx/teamredminer/tree/master/doc

teamredminer.exe -a ton -o stratum+tcp://ton.hashrate.to:4003 -u EQAvGYu70uOIrkc8mptTgX7MFO3JJOf9cHpe7ZYJqSLXEWwm.trmtest -p x
