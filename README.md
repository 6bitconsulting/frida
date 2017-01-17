### Frida
-----

# Basic Setup
-----
1. git clone ``
2. install deps `npm install`
3. mongo db import:
	- Windows:
		a) change directory to where mongodb installed 
		b) run in command prompt `mongorestore.exe -d frida-kahlo "C:\Users\Garrett Morris\Documents\frida\db\frida-kahlo"`
	- Linux
		a) `mongorestore -d frida-kahlo "C:\Users\Garrett Morris\Documents\frida\db\frida-kahlo"`

# Run
-----
1. development: `npm test`
2. production `npm start`
3. restart `pm2 restart keystone`
4. stop `pm2 delete keystone`